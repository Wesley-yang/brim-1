import {PrefsAction, PrefsState} from "./types"

const init: PrefsState = {
  timeFormat: "",
  dataDir: ""
}

export default function reducer(
  state: PrefsState = init,
  action: PrefsAction
): PrefsState {
  switch (action.type) {
    case "$PREFS_TIME_FORMAT_SET":
      return {
        ...state,
        timeFormat: action.format
      }
    case "$PREFS_DATA_DIR_SET":
      return {
        ...state,
        dataDir: action.dataDir
      }
    default:
      return state
  }
}
