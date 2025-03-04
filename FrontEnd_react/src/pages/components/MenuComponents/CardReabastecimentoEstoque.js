import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const CartaoReabastecimentoEstoque = ({ reagentes }) => {
    // Filtra apenas os reagentes que precisam ser repostos
    const reagentesParaReposicao = reagentes.filter(reagente => reagente.quantidade < reagente.limite);

    return (
        <Card sx={{ minWidth: 300, maxWidth: 400, p: 2, bgcolor: "#ffebee", borderLeft: "6px solid #d32f2f" }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", color: "#d32f2f" }}>
                    <WarningIcon sx={{ mr: 1 }} />
                    Reagentes com Baixo Estoque
                </Typography>

                {reagentesParaReposicao.length > 0 ? (
                    reagentesParaReposicao.map((reagente, index) => (
                        <Box key={index} sx={{ mt: 1, p: 1, bgcolor: "#fff", borderRadius: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                {reagente.nome}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Quantidade Atual: <strong>{reagente.quantidade}</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#d32f2f" }}>
                                Limite Mínimo: <strong>{reagente.limite}</strong>
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        Nenhum reagente precisa ser reposto no momento.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default CartaoReabastecimentoEstoque;
