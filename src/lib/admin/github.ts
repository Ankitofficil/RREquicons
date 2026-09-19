// Commits content changes back to the GitHub repository.
//
// The repo is the datastore: a save writes content/*.json (and any uploaded
// image under public/uploads/) via the GitHub Contents API, which triggers
// Hostinger's auto-deploy. That is why admin changes survive redeploys — and
// why they take a minute or two to appear live.

const API = "https://api.github.com";

interface RepoConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export function repoConfig(): RepoConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repoFull = process.env.GITHUB_REPO; // "owner/name"
  if (!token || !repoFull) return null;
  const [owner, repo] = repoFull.split("/");
  if (!owner || !repo) return null;
  return {
    owner,
    repo,
    branch: process.env.GITHUB_BRANCH ?? "main",
    token,
  };
}

export function isGitHubConfigured(): boolean {
  return repoConfig() !== null;
}

async function gh(
  cfg: RepoConfig,
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(`${API}/repos/${cfg.owner}/${cfg.repo}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${cfg.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

/** Current blob SHA for a path, or null when the file does not exist yet. */
async function fileSha(cfg: RepoConfig, filePath: string): Promise<string | null> {
  const res = await gh(
    cfg,
    `/contents/${encodeURIComponent(filePath).replace(/%2F/g, "/")}?ref=${cfg.branch}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const json = (await res.json()) as { sha?: string };
  return json.sha ?? null;
}

/**
 * Create or update a single file. `content` is raw bytes; the API takes
 * base64. Returns the commit SHA.
 */
export async function commitFile(
  filePath: string,
  content: Buffer | string,
  message: string,
): Promise<string> {
  const cfg = repoConfig();
  if (!cfg) throw new Error("GitHub is not configured");

  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch: cfg.branch,
  };

  // Updating an existing file requires its current SHA; omitting it on a new
  // file is what tells the API to create rather than replace.
  const sha = await fileSha(cfg, filePath);
  if (sha) body.sha = sha;

  const res = await gh(
    cfg,
    `/contents/${encodeURIComponent(filePath).replace(/%2F/g, "/")}`,
    { method: "PUT", body: JSON.stringify(body) },
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${detail.slice(0, 200)}`);
  }

  const json = (await res.json()) as { commit?: { sha?: string } };
  return json.commit?.sha ?? "";
}

/** Verifies the token works and has push access, for the settings screen. */
export async function checkAccess(): Promise<{ ok: boolean; message: string }> {
  const cfg = repoConfig();
  if (!cfg) return { ok: false, message: "GITHUB_TOKEN or GITHUB_REPO not set" };
  try {
    const res = await gh(cfg, "");
    if (!res.ok) return { ok: false, message: `Repository unreachable (${res.status})` };
    const json = (await res.json()) as { permissions?: { push?: boolean } };
    return json.permissions?.push
      ? { ok: true, message: `Connected to ${cfg.owner}/${cfg.repo} (${cfg.branch})` }
      : { ok: false, message: "Token lacks push access to this repository" };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
}
