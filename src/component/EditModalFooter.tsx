import React from "react";
import { ModalFooter } from "@atlaskit/modal-dialog";
import { ButtonGroup } from "@atlaskit/button";
import { Button } from "@atlaskit/button/dist/cjs/components/Button";

export default (props: any) => (
    <ModalFooter>
        <span></span>
        <ButtonGroup>
            <Button appearance="primary" type="submit">Update</Button>
            <Button onClick={props.onCancel}>Cancel</Button>
        </ButtonGroup>
    </ModalFooter>
);