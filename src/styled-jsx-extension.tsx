import cn from "classnames";
import React, { FC, HTMLAttributes, useEffect, useState } from "react";

import StyleSheetRegistry from "styled-jsx/dist/stylesheet-registry";
import { CssProps, windyUi } from "./windy-ui";


function invariant(condition, message) {
  if (!condition) {
    throw new Error(`StyleSheetRegistry: ${message}.`);
  }
}


class Registry  extends StyleSheetRegistry {
  private _instancesCounts: any;
  private _fromServer: any;
  private _sheet: any;
  private _indices: any;
  private getIdAndRules: any;
  public cssRules: any;
  public add: any;
  public flush: any;
  
  remove(props) {
    const { styleId } = this.getIdAndRules(props)
    invariant(
      styleId in this._instancesCounts,
      `styleId: \`${styleId}\` not found`
    );
    this._instancesCounts[styleId] -= 1;
    
    if (this._instancesCounts[styleId] < 1) {
      const tagFromServer = this._fromServer && this._fromServer[styleId];
      if (tagFromServer) {
        if (tagFromServer === "test") {
        
        } else {
          tagFromServer.parentNode.removeChild(tagFromServer);
        }
        delete this._fromServer[styleId];
      } else {
        this._indices[styleId].forEach(index => this._sheet.deleteRule(index));
        delete this._indices[styleId];
      }
      
      delete this._instancesCounts[styleId];
    }
  }
  
  selectFromServer() {
    const elements = Array.prototype.slice.call(document.querySelectorAll("[id^=\"__jsx-\"]"));
    const global = document.getElementById("__jsx-global")?.dataset.ids.split(",").reduce((acc, id) => {
      acc[id] = "test";
      return acc;
    }, {});
    
    return {
      ...global,
      ...elements.reduce(function (acc, element) {
        const id = element.id.slice(2);
        acc[id] = element;
        return acc;
      }, {})
    };
  }
}

const styleSheetRegistry = new Registry();

export const Test: FC<HTMLAttributes<any> & CssProps> = (props) => {
  const test = windyUi(props);
  // eslint-disable-next-line new-cap
  const [prevProps, setPrevProps] = useState([]);
  
  test.styleArray.forEach(([className, style]) => {
    styleSheetRegistry.add({ id: className, children: style });
  });
  
  if (prevProps && styleSheetRegistry.cssRules().length !== 0) {
    prevProps.forEach(([className, style]) => {
      styleSheetRegistry.remove({ id: className, children: style });
    });
  }
  
  useEffect(() => {
    setPrevProps(test.styleArray);
  }, [props]);
  
  return React.createElement("div", { className: cn(test.styleArray.map(([className]) => `${className}`)), ...test.filteredProps }, props.children);
};

export function flushToReact(options:{nonce?} = {}) {
  const css = styleSheetRegistry.cssRules();
  styleSheetRegistry.flush();
  return [
    React.createElement("style", {
      id: `__jsx-global`,
      // Avoid warnings upon render with a key
      key: `__jsx-global`,
      nonce: options.nonce ? options.nonce : undefined,
      [`data-ids`]: css.reduce((acc, [id], i) => {
        acc += `${i ? `,` : ""}${id}`;
        return acc;
      }, ""),
      dangerouslySetInnerHTML: {
        __html: css.reduce((acc, [_, css]) => {
          acc += css.replace(/\/\*.*?\*\//gi, "");
          return acc;
        }, "")
      }
    })
  ];
}