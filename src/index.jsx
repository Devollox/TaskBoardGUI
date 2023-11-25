const {app, BrowserWindow, nativeImage} = require('electron')
const path = require('node:path')

const createWindow = () => {

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'TaskBoard',
        icon: path.join(__dirname, 'favicon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.jsx'),
            nodeIntegrationInWorker: true
        },

        titleBarOverlay: {
            color: '#1b1c20',
            symbolColor: 'white',
            height: 5
        }
    })

    mainWindow.setIgnoreMouseEvents(false)
    mainWindow.setIcon(path.join(__dirname, 'favicon.ico'));
    mainWindow.loadFile('src/index.html')
    mainWindow.setMenuBarVisibility(false)

    const view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    view.webContents.loadURL('https://github.com')
}
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})