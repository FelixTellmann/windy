import cn from "classnames";
import React, { createElement, FC, forwardRef, HTMLAttributes, ReactElement, useEffect, useState } from "react";
import StyleSheetRegistry from "styled-jsx/dist/stylesheet-registry";
import { CssProps, windyUi } from "./windy-ui";

function invariant(condition, message) {
  if (!condition) {
    throw new Error(`StyleSheetRegistry: ${message}.`);
  }
}

class Registry extends StyleSheetRegistry {
  remove(props) {
    // @ts-ignore
    const { styleId } = this.getIdAndRules(props);
    invariant(
      // @ts-ignore
      styleId in this._instancesCounts,
      `styleId: \`${styleId}\` not found`
    );
    // @ts-ignore
    this._instancesCounts[styleId] -= 1;
    
    // @ts-ignore
    if (this._instancesCounts[styleId] < 1) {
      // @ts-ignore
      const tagFromServer = this._fromServer && this._fromServer[styleId];
      if (tagFromServer) {
        if (tagFromServer === "test") {
        
        } else {
          tagFromServer.parentNode.removeChild(tagFromServer);
        }
        // @ts-ignore
        delete this._fromServer[styleId];
      } else {
        // @ts-ignore
        this._indices[styleId].forEach(index => this._sheet.deleteRule(index));
        // @ts-ignore
        delete this._indices[styleId];
      }
      
      // @ts-ignore
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

type ElementProps = {
  className?: string
  type?: string
  children?
  forwardRef?
}

const Element = (HTMLTag: string, ref?: unknown): FC<any & ElementProps & HTMLAttributes<any> & CssProps> => {
  if (ref) {
    return forwardRef(({
      type: htmlElement = HTMLTag,
      className,
      children,
      ...props
    }, ref) => {
      const nextUi = windyUi(props);
      // eslint-disable-next-line new-cap
      const [prevProps, setPrevProps] = useState([]);
  
      nextUi.styleArray.forEach(([className, style]) => {
        // @ts-ignore
        styleSheetRegistry.add({ id: className, children: style });
      });
  
      // @ts-ignore
      if (prevProps && styleSheetRegistry.cssRules().length !== 0) {
        prevProps.forEach(([className, style]) => {
          styleSheetRegistry.remove({ id: className, children: style });
        });
      }
  
      useEffect(() => {
        setPrevProps(nextUi.styleArray);
      }, [props]);
  
      return React.createElement(htmlElement, { className: cn(nextUi.styleArray.map(([className]) => `${className}`)), ...nextUi.filteredProps }, props.children);
    });
  } else {
    
  }
}

export const Factory: FC<HTMLAttributes<any> & CssProps> = (props) => {
  const test = windyUi(props);
  // eslint-disable-next-line new-cap
  const [prevProps, setPrevProps] = useState([]);
  
  test.styleArray.forEach(([className, style]) => {
    // @ts-ignore
    styleSheetRegistry.add({ id: className, children: style });
  });
  
  // @ts-ignore
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

export function flushToReact(options: { nonce?: string; } = {}): Array<ReactElement> {
  // @ts-ignore
  const css = styleSheetRegistry.cssRules();
  // @ts-ignore
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