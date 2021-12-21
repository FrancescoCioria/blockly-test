import React, { useRef, useState } from "react";
import View from "react-flexview";
import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow
} from "./Blockly/BlocklyComponents";
// import BlocklyJS from "blockly/javascript";

import "./App.scss";

function App() {
  const simpleWorkspace = useRef<any>();
  const [isToolboxVisible, updateToolboxVisible] = useState(true);

  // const generateCode = () => {
  //   const code = BlocklyJS.workspaceToCode(simpleWorkspace.current!.workspace);
  //   console.log(code);
  // };

  return (
    <View className="App" column hAlignContent="center">
      <View width={400} grow column style={{ position: "relative" }}>
        <View
          hAlignContent="center"
          vAlignContent="center"
          onClick={() => updateToolboxVisible(!isToolboxVisible)}
          style={{ background: "#EEE", cursor: "pointer" }}
          height={30}
        >
          {isToolboxVisible ? "Close" : "Open"}
        </View>
        <BlocklyComponent
          showToolbox={isToolboxVisible}
          ref={simpleWorkspace}
          readOnly={false}
          // trashcan={true}
          media={"https://blockly-demo.appspot.com/static/media/"}
          zoom={{
            startScale: 0.6,
            controls: true,
            pinch: true
            // wheel: true
          }}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
          grid={{
            colour: "#ccc",
            snap: true,
            spacing: 20
          }}
          collapse={true}
          toolbox={[
            "controls_ifelse",
            "logic_compare",
            "logic_null",
            "controls_repeat_ext",
            "text_charAt"
          ]}
          horizontalLayout={true}
          initialXml={`
<xml>
  <block type="controls_ifelse" x="0" y="0"></block>
</xml>
          `}
          // theme={{
          //   componentStyles: {
          //     // toolboxBackgroundColour: "#333",
          //     flyoutOpacity: 0.3
          //   }
          // }}
          renderer="zelos"
        >
          <Block type="test_react_field" />
          <Block type="test_react_date_field" />
          <Block type="controls_ifelse" />
          <Block type="logic_compare" />
          <Block type="logic_operation" />
          <Block type="controls_repeat_ext">
            <Value name="TIMES">
              <Shadow type="math_number">
                <Field name="NUM">10</Field>
              </Shadow>
            </Value>
          </Block>
          <Block type="logic_operation" />
          <Block type="logic_negate" />
          <Block type="logic_boolean" />
          <Block type="logic_null" disabled="true" />
          <Block type="logic_ternary" />
          <Block type="text_charAt">
            <Value name="VALUE">
              <Block type="variables_get">
                <Field name="VAR">text</Field>
              </Block>
            </Value>
          </Block>
        </BlocklyComponent>
      </View>
    </View>
  );
}

export default App;
