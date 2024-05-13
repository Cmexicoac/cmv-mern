import styled from "styled-components";
import { Unity, useUnityContext } from "react-unity-webgl";
import React from "react";
import "./TemplateData/style.css";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // This will make the container take up the full viewport height
`;

export function Juego() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/public.loader.js",
    dataUrl: "Build/public.data",
    frameworkUrl: "Build/public.framework.js",
    codeUrl: "Build/public.wasm",
  });

  return (
    <CenteredContainer>
      <Unity unityProvider={unityProvider} style={{ height: 400, width: 920 }} />
    </CenteredContainer>
  );
}