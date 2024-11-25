import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Camera } from 'react-camera-pro'
import { Button as ButtonNextUi } from '@nextui-org/react'
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column-reverse;
  z-index: 50;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20%;
  }

  @media (max-width: 400px) {
    padding: 10px;
  }
`

const Button = styled.button`
  outline: none;
  color: white;
  background: transparent;
  cursor: pointer;
  border: none;
  filter: invert(100%);
  &:hover {
    opacity: 0.7;
  }
`

const TakePhotoButton = styled(Button)`
  background: url('https://img.icons8.com/ios/50/000000/compact-camera.png');
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-size: 40px;
  width: 40px;
  height: 40px;
`

const CameraComponent = ({ handleClear, setImage }) => {
    const [numberOfCameras, setNumberOfCameras] = useState(0)
    const camera = useRef(null)

    return (
        <Wrapper>
            <Camera
                ref={camera}
                numberOfCamerasCallback={setNumberOfCameras}
                style={{ width: '100%', height: '100%' }}
            />
            <Control>
                <ButtonNextUi color="danger" variant="faded" onClick={() => { handleClear() }}>Cancelar</ButtonNextUi>
                <TakePhotoButton
                    onClick={() => {
                        if (camera.current) {
                            const photo = camera.current.takePhoto()
                            setImage(photo) // Esta función ya se encargará de agregar la nueva imagen al arreglo
                            handleClear()
                        }
                    }}
                />
                <ChangeFacingCameraButton
                    disabled={numberOfCameras <= 1}
                    onClick={() => {
                        if (camera.current) {
                            camera.current.switchCamera()
                        }
                    }}
                />
            </Control>
        </Wrapper>
    )
}

export default CameraComponent
