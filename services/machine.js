import useMachineStore from '@/app/(layout-app)/sales/components/store/machine'
export const setStateMachine = (value) => {
    const { setStatus } = useMachineStore(({ setStatus }) => ({ setStatus }))
    setStatus(value)
}
