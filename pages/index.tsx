import { FC, useState } from "react";
import { Test } from "src/styled-jsx-extension";

export const Index: FC = () => {
  
  const [test2, setTest2] = useState(1);
  return <>
    <Test p={test2} border="1px solid red" m="auto" w={[`100%`, `50%`]} d="flex" onClick={() => { setTest2(test2 + 1); }}>aasd</Test>
    <Test p={test2} border="1px solid red" m="auto" w={[`100%`, `50%`]} d="flex" onClick={() => { setTest2(test2 + 1); }}>aasd</Test>
    <Test p={test2} border="1px solid red" m="auto" w={[`100%`, `50%`]} d="flex" onClick={() => { setTest2(test2 + 1); }}>aasd</Test>
    <Test border="2px solid green" position="absolute" d="block" p={3}>aasd</Test>
    <Test p={5} border="1px solid red" _hfa={{ p: [1, 2] }} m="auto" w={[`100%`, `50%`]} d="flex" >aasd</Test>
     <div className="w-50">asdasd</div>
     <style jsx>{`
      @media screen and (min-width: 600px) {
        .w-50 {
          width: 50%;
          padding: 2px;
        }
      }
    `}</style>
  </>;
};

export default Index;