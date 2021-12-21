import React, { Fragment } from "react";
import View from "react-flexview";

import Blockly from "blockly/core";
import locale from "blockly/msg/en";
// import {
//   ScrollOptions,
//   ScrollBlockDragger,
//   ScrollMetricsManager
// } from "@blockly/plugin-scroll-options";

import "blockly/blocks";

Blockly.setLocale(locale);

class BlocklyComponent extends React.Component<
  Partial<Omit<Blockly.BlocklyOptions, "toolbox">> & {
    initialXml?: string;
    toolbox: string[];
    showToolbox: boolean;
  }
> {
  blocklyDiv = React.createRef<HTMLDivElement>();
  workspace: Blockly.WorkspaceSvg = null as any;

  buildToolbox = () => {
    // this.workspace.updateToolbox();
  };

  componentDidMount() {
    const { initialXml, toolbox, children, ...rest } = this.props;

    const plugins = {
      plugins: {
        // blockDragger: ScrollBlockDragger,
        // metricsManager: ScrollMetricsManager
      }
    };

    this.workspace = Blockly.inject(this.blocklyDiv.current!, {
      toolbox: {
        kind: "flyoutToolbox",
        contents: this.props.toolbox.map(type => ({
          kind: "block",
          type
        })) as any
      },
      ...plugins,
      ...rest
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(initialXml),
        this.workspace
      );
    }

    this.updateToolbox();

    // const pluginScroll = new ScrollOptions(this.workspace);
    // pluginScroll.init({
    //   enableWheelScroll: false,
    //   edgeScrollOptions: false
    // });
  }

  updateToolbox = () => {
    this.workspace.getFlyout().setVisible(this.props.showToolbox);
    this.workspace.recordDragTargets();
  };

  componentDidUpdate() {
    this.updateToolbox();
  }

  render() {
    return (
      <View
        grow
        column
        ref={this.blocklyDiv}
        id="blocklyDiv"
        style={{
          background: "lightblue"
        }}
      />
    );
  }
}

export default BlocklyComponent;

export const Block = (p: any) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("block", props, children);
};

export const Category = (p: any) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("category", props, children);
};

export const Value = (p: any) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("value", props, children);
};

export const Field = (p: any) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("field", props, children);
};

export const Shadow = (p: any) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("shadow", props, children);
};
