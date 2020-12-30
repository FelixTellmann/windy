import { FC, useState } from "react";
import { TEST/*, Element*/ } from "src/styled-jsx-extension";

/*const Div = Element('div')
const H1 = Element('h1')*/
export const Index: FC = () => {
  
  
  const [test2, setTest2] = useState(1);
  return <>
    {/*<Div p={4}>test</Div>
    <Div p={test2} border="1px solid red" m="auto" w={[`100%`, `50%`]} d="flex" onClick={() => { setTest2(test2 + 1); }}>aasd</Div>*/}
    <TEST p={test2} border="1px solid red" m="auto" w={[`100%`, `50%`]} d="flex" onClick={() => { setTest2(test2 + 1); }}>aasd</TEST>
     {/*<div className="w-50">asdasd</div>
     <style jsx>{`
      @media screen and (min-width: 600px) {
        .w-50 {
          width: 50%;
          padding: 2px;
        }
      }
    `}</style>*/}
  </>;
};

export default Index;