import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography
} from '@mui/material';

const AnalitoSelector = ({ onClose }) => {
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [checkboxSections, setCheckboxSections] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [classificacoes, setClassificacoes] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [subtipos, setSubtipos] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({}); // Para armazenar as opções selecionadas

    useEffect(() => {
        // Chamada à API para obter procedimentos
        const fetchProcedures = async () => {
            try {
                const response = await fetch('http://localhost:8080/analito'); // Endpoint para obter analitos
                if (!response.ok) {
                    throw new Error('Erro ao buscar procedimentos');
                }
                const data = await response.json();
                setProcedures(data); // Ajustar a estrutura de dados conforme necessário
            } catch (error) {
                console.error(error);
            }
        };

        const fetchClassificacoes = async () => {
            try {
                const response = await fetch('http://localhost:8080/analito/classificacoes'); // Endpoint para obter classificações
                if (!response.ok) {
                    throw new Error('Erro ao buscar classificações');
                }
                const data = await response.json();
                setClassificacoes(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTipos = async () => {
            try {
                const response = await fetch('http://localhost:8080/analito/tipos'); // Endpoint para obter tipos
                if (!response.ok) {
                    throw new Error('Erro ao buscar tipos');
                }
                const data = await response.json();
                setTipos(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchSubtipos = async () => {
            try {
                const response = await fetch('http://localhost:8080/analito/subtipos'); // Endpoint para obter subtipos
                if (!response.ok) {
                    throw new Error('Erro ao buscar subtipos');
                }
                const data = await response.json();
                setSubtipos(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProcedures();
        fetchClassificacoes();
        fetchTipos();
        fetchSubtipos();
    }, []);

    const handleAnalitoSelection = (event, value) => {
        setSelectedProcedure(value);
        if (value) {
            // Use as listas obtidas para criar seções de checkbox
            setCheckboxSections([
                { title: 'Classificações', options: classificacoes },
                { title: 'Tipos', options: tipos },
                { title: 'Subtipos', options: subtipos }
            ]);
        }
    };

    const handleOptionChange = (sectionTitle, option, checked) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [sectionTitle]: {
                ...prev[sectionTitle],
                [option]: checked
            }
        }));
    };

    const handleSave = async () => {
        const selectedClassificacoes = selectedOptions['Classificações'] || {};
        const selectedTipos = selectedOptions['Tipos'] || {};
        const selectedSubtipos = selectedOptions['Subtipos'] || {};
        
        // Formato dos dados a serem enviados
        const dataToSave = {
            analito: selectedProcedure, // Use a estrutura correta para o analito
            classificacoes: Object.keys(selectedClassificacoes).filter(key => selectedClassificacoes[key]),
            tipos: Object.keys(selectedTipos).filter(key => selectedTipos[key]),
            subtipos: Object.keys(selectedSubtipos).filter(key => selectedSubtipos[key]),
        };

        // Chamada à API para salvar os dados
        try {
            const response = await fetch('http://localhost:8080/analito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });
            if (!response.ok) {
                throw new Error('Erro ao salvar analito');
            }
            console.log('Analito salvo com sucesso!');
            onClose(); // Fecha o diálogo após salvar
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Escolha o Analito</DialogTitle>
            <DialogContent>
                {/* Campo de Autocomplete para Analitos */}
                <Autocomplete
                    options={procedures}
                    getOptionLabel={(option) => option.nome || ""} // Use a propriedade 'nome' para o Autocomplete
                    onChange={handleAnalitoSelection}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Analitos"
                            required
                            margin="normal"
                            style={{ width: '350px' }}
                        />
                    )}
                />

                {/* Exibir checkboxes conforme a escolha do analito */}
                {checkboxSections.map((section, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: 'white',
                            padding: '20px',
                            marginTop: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography variant="h6">{section.title}</Typography>
                        <FormGroup>
                            {section.options.map((option, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={
                                        <Checkbox
                                            checked={selectedOptions[section.title]?.[option] || false}
                                            onChange={(e) => handleOptionChange(section.title, option, e.target.checked)}
                                        />
                                    }
                                    label={option}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
                <Button onClick={handleSave} color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnalitoSelector;
