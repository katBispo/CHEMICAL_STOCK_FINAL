import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../components/SideBar.js';
import { useNavigate } from 'react-router-dom';
import AmostraCadastro from './AmostraCadastro';
import AnaliseCadastro from './AnaliseCadastro';
import AnalitoCadastro from './AnalitoCadastro';
import ClienteCadastro from './ClienteCadastro';
import ContratoCadastro from './ContratoCadastro';
import ProcedimentoCadastro from './ProcedimentoCadastro';
import ReagenteCadastro from './ReagenteCadastro';

function CadastrarProcesso() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        'Cadastrar Cliente',
        'Cadastrar Contrato',
        'Cadastrar Procedimento',
        'Cadastrar Reagente',
        'Cadastrar Analito',
        'Cadastrar Análise',
        'Cadastrar Amostra',
    ];

    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleNext = () => setActiveStep(prev => prev + 1);
    const handleBack = () => setActiveStep(prev => prev - 1);
    const handleFinish = () => setDialogOpen(true);
    const handleCloseDialog = () => {
        setDialogOpen(false);
        navigate('/');
    };

    const renderStepContent = (stepIndex) => {
        const props = { onSuccess: handleNext }; // passo função para avançar
        switch (stepIndex) {
            case 0: return <ClienteCadastro {...props} />;
            case 1: return <ContratoCadastro {...props} />;
            case 2: return <ProcedimentoCadastro {...props} />;
            case 3: return <ReagenteCadastro {...props} />;
            case 4: return <AnalitoCadastro {...props} />;
            case 5: return <AnaliseCadastro {...props} />;
            case 6: return <AmostraCadastro {...props} />;
            default: return 'Passo desconhecido';
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ bgcolor: "#4CAF50", zIndex: theme => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Cadastrar Processo
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={true} toggleDrawer={() => {}} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />
                <Typography variant="h4" gutterBottom>Cadastrar Processo</Typography>

                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}><StepLabel>{label}</StepLabel></Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Voltar</Button>
                    <Button
                        variant="contained"
                        onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                    >
                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                    </Button>
                </Box>
            </Box>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Cadastro Finalizado</DialogTitle>
                <DialogContent>O processo foi cadastrado com sucesso!</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default CadastrarProcesso;
