/* eslint-disable camelcase */
import useSettingsStore from '@/stores/settings'
/* GET GENERAL */
export const getDeviceTuu = () => {
    const { selectedPostMachine } = useSettingsStore.getState()
    return selectedPostMachine?.serial_number
}
