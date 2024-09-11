import {app, BrowserWindow, Tray} from "electron";
import * as fs from "node:fs";
import * as path from "node:path";
import {injectable} from "inversify";
import "reflect-metadata"; // Required for InversifyJS to work properly
import {OnAppReady} from "../interfaces/on-app-ready.interface";
import {Observable, ReplaySubject} from "rxjs";
import {WindowListener} from "../decorators/window-listener.decorator";
import {WindowEventEnum} from "../enums/window-listener.enum";

@injectable()
export abstract class WindowBaseClass implements OnAppReady {
    protected static isServeMode = process.argv.slice(1).some(val => val === '--serve');
    protected window: BrowserWindow | null = null;
    protected tray: Tray | null = null;
    protected readonly app = app;
    private _window$: ReplaySubject<BrowserWindow> = new ReplaySubject<BrowserWindow>();

    constructor() {
        app.whenReady().then(() => this.onAppReady());
    }

    abstract onAppReady(): void;

    protected loadUrl(window: BrowserWindow, absolutePath: string) {
        this.window = window;
        this._window$.next(window);
        this._window$.complete();
        if (WindowBaseClass.isServeMode) {
            const debug = require('electron-debug');
            debug();

            require('electron-reloader')(module);
            this.window.loadURL('http://localhost:4200');
        } else {
            let pathIndex = './index.html';

            if (fs.existsSync(path.join(absolutePath, '../dist/index.html'))) {
                pathIndex = '../dist/index.html';
            }

            const url = new URL(path.join('file:', absolutePath, pathIndex));
            this.window.loadURL(url.href);
        }
    }

    public getWindow(): Observable<BrowserWindow> {
        return this._window$.asObservable();
    }

    @WindowListener(WindowEventEnum.CLOSED)
    onWindowClose() {
        this.window = null;
    }

}
