import React, { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    TextField,
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
import AmostraCadastro from './AmostraCadastro'; // Importe os componentes de cadastro
import AnaliseCadastro from './AnaliseCadastro';
import AnalitoCadastro from './AnalitoCadastro';
import ClienteCadastro from './ClienteCadastro';
import ContratoCadastro from './ContratoCadastro';
import ProcedimentoCadastro from './ProcedimentoCadastro';
import ReagenteCadastro from './ReagenteCadastro';

function CadastrarProcesso() {
    const [activeStep, setActiveStep] = useState(0);
    const [steps] = useState([
        'Cadastrar Cliente',
        'Cadastrar Contrato',
        'Cadastrar Procedimento',
        'Cadastrar Reagente',
        'Cadastrar Analito',
        'Cadastrar Análise',
        'Cadastrar Amostra',
    ]);

    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);

    // Funções de navegação entre as etapas
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleFinish = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        navigate('/');
    };

    // Função para renderizar os componentes com base na etapa atual
    const renderStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <ClienteCadastro />;
            case 1:
                return <ContratoCadastro />;
            case 2:
                return <ProcedimentoCadastro />;
            case 3:
                return <ReagenteCadastro />;
            case 4:
                return <AnalitoCadastro />;
            case 5:
                return <AnaliseCadastro />;
            case 6:
                return <AmostraCadastro />;
            default:
                return 'Passo desconhecido';
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ bgcolor: "#4CAF50", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cadastrar Processo
                    </Typography>
                </Toolbar>
            </AppBar>

            <SideBar drawerOpen={true} toggleDrawer={() => {}} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                <Toolbar />
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Cadastrar Processo
                    </Typography>

                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box sx={{ mt: 4 }}>
                        {renderStepContent(activeStep)}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Voltar
                        </Button>
                        <Box>
                            {activeStep === steps.length - 1 ? (
                                <Button variant="contained" onClick={handleFinish}>
                                    Finalizar
                                </Button>
                            ) : (
                                <Button variant="contained" onClick={handleNext}>
                                    Próximo
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Cadastro Finalizado</DialogTitle>
                <DialogContent>O processo foi cadastrado com sucesso!</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default CadastrarProcesso;
