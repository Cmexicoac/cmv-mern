import { Unity, useUnityContext } from "react-unity-webgl";
import React, { useRef } from "react";
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // This will make the container take up the full viewport height
`;

const FullScreenButton = styled.button`
  position: absolute;
  bottom: 60px;
  right: 170px;
`;

export function Juego() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/juegos/Build/juegos.loader.js",
    dataUrl: "/juegos/Build/juegos.data",
    frameworkUrl: "/juegos/Build/juegos.framework.js",
    codeUrl: "/juegos/Build/juegos.wasm",
  });

  const unityRef = useRef(null);

  const handleFullScreen = () => {
    if (unityRef.current.requestFullscreen) {
      unityRef.current.requestFullscreen();
    } else if (unityRef.current.mozRequestFullScreen) { /* Firefox */
      unityRef.current.mozRequestFullScreen();
    } else if (unityRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      unityRef.current.webkitRequestFullscreen();
    } else if (unityRef.current.msRequestFullscreen) { /* IE/Edge */
      unityRef.current.msRequestFullscreen();
    }
  };

  return (
    <CenteredContainer>
      <Unity unityProvider={unityProvider} style={{ height: 400, width: 920 }} ref={unityRef} />
      <FullScreenButton onClick={handleFullScreen}>Pantalla completa</FullScreenButton>
    </CenteredContainer>
  );
}