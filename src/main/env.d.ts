/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
