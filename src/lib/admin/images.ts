// Image specs per content type.
//
// The ratios are the conventional ones for each use, so uploads stay
// consistent and layouts never shift:
//   16:9  — the standard for project/editorial cards and hero imagery
//   4:3   — case study documentation photos (what site cameras produce)
//   1.91:1 — the Open Graph / social preview ratio (1200x630)
//   3:4   — portrait, the convention for headshots
//
// Uploads are resized and re-encoded server-side, so an admin can drop in a
// 12 MP phone photo and the site still serves a sensibly sized WebP.

export interface ImageSpec {
  label: string;
  ratio: number;
  ratioLabel: string;
  width: number;
  height: number;
}

export const IMAGE_SPECS = {
  project: {
    label: "Project photo",
    ratio: 16 / 9,
    ratioLabel: "16:9",
    width: 1600,
    height: 900,
  },
  "case-study": {
    label: "Case study photo",
    ratio: 4 / 3,
    ratioLabel: "4:3",
    width: 1600,
    height: 1200,
  },
  insight: {
    label: "Article image",
    ratio: 16 / 9,
    ratioLabel: "16:9",
    width: 1600,
    height: 900,
  },
  leader: {
    label: "Portrait",
    ratio: 3 / 4,
    ratioLabel: "3:4",
    width: 900,
    height: 1200,
  },
  social: {
    label: "Social preview",
    ratio: 1200 / 630,
    ratioLabel: "1.91:1",
    width: 1200,
    height: 630,
  },
} as const satisfies Record<string, ImageSpec>;

export type ImageKind = keyof typeof IMAGE_SPECS;

// Anything larger is rejected before it reaches the resizer — a guard against
// both mistakes and abuse.
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024; // 12 MB

export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;
