/* eslint-disable camelcase */
import useSettingsStore from '@/stores/settings'
/* GET GENERAL */
export const getDeviceTuu = () => {
    const { SelectedPostMachine } = useSettingsStore.getState()
    return SelectedPostMachine?.serial_number
}
