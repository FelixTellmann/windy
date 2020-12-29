import { Head } from "next/document";
import { Component, FC, useEffect, useState } from "react";
import { Test } from "styled-jsx2/style";
import cn from "classnames";
import _stylesheetRegistry from "styled-jsx/dist/stylesheet-registry";
import { flushToHTML } from 'styled-jsx/server'
import { CssProps, useJsxSystem } from "../src";

/* const styleSheetRegistry = new _stylesheetRegistry();

class Test2 extends Component {
  constructor(props) {
    super(props);
    this.prevProps = {};
    this.test = useJsxSystem(props);
  }
  
  componentWillUnmount() {
    this.test.styleArray.forEach(([className, style]) => {
      styleSheetRegistry.remove({ id: className, children: style });
    });
  }
  
  render() {
    // This is a workaround to make the side effect async safe in the "render" phase.
    // See https://github.com/zeit/styled-jsx/pull/484
    console.log(this.prevProps)
    if (this.prevProps.id) {
      styleSheetRegistry.remove(this.prevProps);
    }
    console.log(this.prevProps)
    
    this.test.styleArray.forEach(([className, style]) => {
      styleSheetRegistry.add({ id: className, children: style });
    });
    
    this.prevProps = this.props;
    
    return <>
      <div className={cn(this.test.styleArray.map(([className]) => className))} {...this.test.filteredProps}>{this.props.children}</div>
    </>;
  }
  
} */

/* const Test: FC<CssProps> = (props) => {
  const test = useJsxSystem(props);
  // eslint-disable-next-line new-cap
  
  test.styleArray.forEach(([className, style]) => {
    styleSheetRegistry.add({ id: className, children: style });
  });
  
  useEffect(() => {
    return () => {
      test.styleArray.forEach(([className, style]) => {
        styleSheetRegistry.remove({ id: className, children: style });
      });
    }
  })
  
  return <>
    <div className={cn(test.styleArray.map(([className]) => `${className}`))} {...test.filteredProps}>{props.children}</div>
  </>;
}; */

export const Index: FC = () => {
  
  const [test2, setTest2] = useState(1);
  return <>
    
    <Test p={test2} border="1px solid red" m="auto" w={[`100%`, `50%`]} d="flex" onClick={() => { setTest2(test2 + 1); }}>aasd</Test>
    <Test p={test2} border="1px solid red" m="auto" w={[`100%`, `50%`]} d="flex" onClick={() => { setTest2(test2 + 1); }}>aasd</Test>
    <Test p={test2} border="1px solid red" m="auto" w={[`100%`, `50%`]} d="flex" onClick={() => { setTest2(test2 + 1); }}>aasd</Test>
    <Test p={3} border="1px solid red" _hfa={{ p: [1, 2] }} m="auto" w={[`100%`, `50%`]} d="flex">aasd</Test>
    <div className="w-50">asdasd</div>
    {/* <style jsx>{`
      @media screen and (min-width: 600px) {
        .w-50 {
          width: 50%;
          padding: ${test2};
        }
      }
    `}</style> */}
  </>;
};


export default Index;