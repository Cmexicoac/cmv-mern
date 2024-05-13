import styled from "styled-components";
import { Unity, useUnityContext } from "react-unity-webgl";
import React, { Fragment } from "react";
import "./TemplateData/style.css";

export function Juego() {

  const {unityProvider} = useUnityContext({
    loaderUrl: "Build/public.loader.js",
    dataUrl: "Build/public.data",
    frameworkUrl: "Build/public.framework.js",
    codeUrl: "Build/public.wasm",
  });

  return (<Container>
    <Fragment>
      <Unity unityProvider={unityProvider} style={{ height: 560, width: 1000 }} />

    </Fragment>
  </Container>);
}
const Container =styled.div`
  height:100vh;
`