const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  loadJobs: () => ipcRenderer.invoke("load-jobs"),
  saveJobs: (jobs) => ipcRenderer.invoke("save-jobs", jobs)
});
