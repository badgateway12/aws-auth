import React, { Fragment } from "react";

type AuxProps = {
  children: React.ReactNode;
}

export const Aux = (props: AuxProps) => 
<Fragment>
  {props.children}
</Fragment>
