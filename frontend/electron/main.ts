import { app, BrowserWindow } from "electron";

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";
import { spawn } from "child_process";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null = null;
let backendProcess: any = null;

const BACKEND_PORT = 8000;
const BACKEND_URL = `http://127.0.0.1:${BACKEND_PORT}`;

// ---------------- BACKEND HELPERS ----------------


function getBackendDir() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "backend");
  }

  // dev mode
  return path.join(__dirname, "..", "..", "backend");
}

function isBackendInstalled() {
  const backendDir = getBackendDir();
  return (
    fs.existsSync(path.join(backendDir, "start.py")) &&
    fs.existsSync(path.join(backendDir, "python", "python.exe"))
  );
}

async function isBackendAlive(): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

function startBackend() {
  const backendDir = getBackendDir();

  backendProcess = spawn(
    path.join(backendDir, "python", "python.exe"),
    ["start.py"],
    {
      cwd: backendDir,
      windowsHide: true,
    }
  );

  backendProcess.stdout.on("data", (d: Buffer) =>
    console.log("[backend]", d.toString())
  );
  backendProcess.stderr.on("data", (d: Buffer) =>
    console.error("[backend]", d.toString())
  );
}

async function waitForBackend(timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isBackendAlive()) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Backend failed to start");
}

async function initBackend() {
  win?.webContents.send("startup-status", { stage: "checking-backend" });

  if (!isBackendInstalled()) {
    win?.webContents.send("startup-status", {
      stage: "backend-missing",
    });
    return;
  }

  if (!(await isBackendAlive())) {
    win?.webContents.send("startup-status", {
      stage: "starting-backend",
    });

    startBackend();
    await waitForBackend();
  }

  win?.webContents.send("startup-status", { stage: "ready" });
}

// ---------------- WINDOW ----------------

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC!, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    autoHideMenuBar : true,
  });

  win.webContents.on("did-finish-load", () => {
    initBackend();
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// ---------------- APP LIFECYCLE ----------------

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (backendProcess) {
      backendProcess.kill();
      backendProcess = null;
    }
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
