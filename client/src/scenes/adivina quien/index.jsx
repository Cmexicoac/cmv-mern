import styled from "styled-components";
import { Unity, useUnityContext } from "react-unity-webgl";
import React from "react";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // This will make the container take up the full viewport height
`;

export function Juego() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/juegos/Build/juegos.loader.js",
    dataUrl: "/juegos/Build/juegos.data",
    frameworkUrl: "/juegos/Build/juegos.framework.js",
    codeUrl: "/juegos/Build/juegos.wasm",
  });

  return (
    <CenteredContainer>
      <Unity unityProvider={unityProvider} style={{ height: 400, width: 920 }} />
    </CenteredContainer>
  );
} 