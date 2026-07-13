# INCURABLE.AI Autonomous Wet Lab


A production-ready, static Three.js biotech wet-lab experience with autonomous protocol execution, live orchestration, machine inspection and responsive camera controls.

## Deploy on GitHub Pages

1. Upload the contents of this folder to the root of a GitHub repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. After each release, update the build value in `version.json`, the `<meta name="build-id">` tag, and the `BUILD_ID` constant together.

No package manager, build step, dynamic import, service worker or application chunk is used. The pinned Three.js r128 runtime is vendored in `vendor/three.min.js`; sequential CDN fallbacks are retained only for recovery. WebGL is required.

## Controls

- Drag: orbit
- Shift-drag or right-drag: pan
- Wheel or pinch: zoom
- Two-finger drag: pan
- Double-click or `0`: fit the laboratory
- Arrow keys: orbit
- `W A S D`: pan
- `F`: focus selected instrument
- Space: run or pause protocol
- `R`: reset protocol

## Release checklist

- Keep `.nojekyll` in the repository root.
- Deploy only the files in this folder; keep development backups outside it.
- Confirm `version.json`, the HTML build meta tag and `BUILD_ID` match.
- Test the deployed URL in a private browser window after publishing.
