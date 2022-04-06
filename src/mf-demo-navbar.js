import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import "./set-public-path";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <div className="mt-16">Error Happened</div>;
  },
});

export const {  bootstrap, unmount } = lifecycles;

export function mount(props) {
  if(props.authToken === 'd83jD63UdZ6RS6f70D0'){ 
    return lifecycles.mount(props);
  }
  return Promise.reject().catch(() => {
    console.log('Error in Authentication!');
  });
}

function domElementGetter() {
  let shouldCreateNew = false;
  let el = document.getElementById("mf-navbar");
  if (!el) {
    shouldCreateNew = true;
    el = document.createElement("nav");
    el.id = "mf-navbar";
  }
  el.className = "navbar navbar-dark bg-dark navbar-expand-lg";
  if (shouldCreateNew) {
    document.body.appendChild(el);
  }
  return el;
}
