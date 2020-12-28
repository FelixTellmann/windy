import { FC, useState } from "react";
import _JSXStyle from "styled-jsx/style";
import cn from 'classnames';
import { CssProps, useJsxSystem } from "../src";


type IndexProps = {};

const Test: FC<CssProps> = (props) => {
  const test = useJsxSystem(props);
  console.log(test);
  return <>
    <div className={cn(test.test.map(([_,className])=>className))}>{props.children}</div>
    {
      test.test.map(([id, _, style]) => <_JSXStyle key={id} id={id}>{style}</_JSXStyle>)
    }
    
  </>;
};

export const Index: FC<IndexProps> = ({}) => {
  return <>
    <Test p={2} border="1px solid red" _hfa={{ p: 1 }} m="auto" w={[`100%`, `50%`]} d="flex">aasd</Test>
    <Test p={3} border="1px solid red"  _hfa={{p: [1,2]}} m="auto" w={[`100%`, `50%`]} d="flex">aasd</Test>
    <div className="w-50">asdasd</div>
    <style jsx>{`
      @media screen and (min-width: 600px){.w-50{width:50%;}}
    `}</style>
  </>;
};

export default Index;