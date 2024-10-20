// FeedbackDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const FeedbackDialog = ({ open, message, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Mensagem</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FeedbackDialog;
