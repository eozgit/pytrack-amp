import React from "react";
import PropTypes from 'prop-types';
import { ModalFooter } from "@atlaskit/modal-dialog";
import { ButtonGroup } from "@atlaskit/button";
import { Button } from "@atlaskit/button/dist/cjs/components/Button";

const EditModalFooter = (props: any) => (
    <ModalFooter>
        <span></span>
        <ButtonGroup>
            <Button appearance="primary" type="submit">{props.submitText}</Button>
            {props.onDelete && <Button appearance="danger" onClick={props.onDelete}>Delete</Button>}
            <Button onClick={props.onCancel}>Cancel</Button>
        </ButtonGroup>
    </ModalFooter>
);

EditModalFooter.propTypes = {
    submitText: PropTypes.string,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
}

export default EditModalFooter