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
    const [procedures, setProcedures] = useState([]);
    const [tiposESubtipos, setTiposESubtipos] = useState([]);
    const [showTiposESubtipos, setShowTiposESubtipos] = useState(false); // Controle da exibição dos tipos e subtipos
    const [selectedOptions, setSelectedOptions] = useState({}); 

    useEffect(() => {
        // Função para buscar procedimentos
        const fetchProcedures = async () => {
            try {
                const response = await fetch('http://localhost:8080/analito');
                if (!response.ok) {
                    throw new Error('Erro ao buscar analitos');
                }
                const data = await response.json();
                setProcedures(data);

                // Organiza os dados em tipos e subtipos por classificação
                const tiposMap = {};
                data.forEach(item => {
                    if (item.classificacao && item.tipoAnalito && item.subtipoAnalito) {
                        if (!tiposMap[item.classificacao]) {
                            tiposMap[item.classificacao] = [];
                        }
                        tiposMap[item.classificacao].push({
                            tipo: item.tipoAnalito,
                            subtipos: item.subtipoAnalito
                        });
                    }
                });

                setTiposESubtipos(Object.entries(tiposMap).map(([classificacao, tipos]) => ({
                    classificacao,
                    tipos
                })));
            } catch (error) {
                console.error(error);
            }
        };

        fetchProcedures();
    }, []);

    const handleAnalitoSelection = (event, value) => {
        setSelectedProcedure(value);
        setShowTiposESubtipos(true); // Mostrar a próxima etapa após a seleção
    };

    const handleOptionChange = (classificacao, tipo, subtipo, checked) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [classificacao]: {
                ...prev[classificacao],
                [tipo]: {
                    ...prev[classificacao]?.[tipo],
                    [subtipo]: checked
                }
            }
        }));
    };

    const handleSave = async () => {
        const selectedData = Object.entries(selectedOptions).reduce((acc, [classificacao, tipos]) => {
            const selectedTipos = Object.entries(tipos).reduce((tiposAcc, [tipo, subtipos]) => {
                const selectedSubtipos = Object.keys(subtipos).filter(subtipo => subtipos[subtipo]);
                if (selectedSubtipos.length) {
                    tiposAcc.push({ tipo, subtipos: selectedSubtipos });
                }
                return tiposAcc;
            }, []);
            if (selectedTipos.length) {
                acc.push({ classificacao, tipos: selectedTipos });
            }
            return acc;
        }, []);

        const dataToSave = {
            analito: selectedProcedure, 
            selecoes: selectedData,
        };

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
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Escolha o Analito</DialogTitle>
            <DialogContent>
                {/* Primeiro passo: seleção de classificação */}
                <Autocomplete
                    options={procedures}
                    getOptionLabel={(option) => option.nome || ""}
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

                {/* Segundo passo: exibição dos tipos e subtipos apenas após seleção de classificação */}
                {showTiposESubtipos && selectedProcedure && (
                    tiposESubtipos
                        .filter(item => item.classificacao === selectedProcedure.classificacao)
                        .map((classObj, index) => (
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
                                <Typography variant="h6">{classObj.classificacao}</Typography>
                                {classObj.tipos.map((tipoObj, idx) => (
                                    <Box key={idx} sx={{ marginLeft: '10px' }}>
                                        <Typography variant="subtitle1">{tipoObj.tipo}</Typography>
                                        <FormGroup>
                                            {tipoObj.subtipos.map((subtipo, sIdx) => (
                                                <FormControlLabel
                                                    key={sIdx}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedOptions[classObj.classificacao]?.[tipoObj.tipo]?.[subtipo] || false}
                                                            onChange={(e) => handleOptionChange(classObj.classificacao, tipoObj.tipo, subtipo, e.target.checked)}
                                                        />
                                                    }
                                                    label={subtipo}
                                                />
                                            ))}
                                        </FormGroup>
                                    </Box>
                                ))}
                            </Box>
                        ))
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
                <Button onClick={handleSave} color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnalitoSelector;
