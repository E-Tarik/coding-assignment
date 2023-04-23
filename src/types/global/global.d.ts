declare var window: Window;

// workaround for named export
export interface Window {
    fetch: any;
}
