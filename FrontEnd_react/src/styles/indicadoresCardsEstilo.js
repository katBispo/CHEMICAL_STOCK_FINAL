// src/components/IndicadoresCards.styles.js

const IndicadoresCardsStyles = {
  // Container principal dos cards
  container: {
    mb: 5,
  },

  // Card individual (recebe a cor como parâmetro)
  card: (cor) => ({
    p: 3,
    height: "100%",
    borderRadius: 3,
    borderLeft: `6px solid ${cor}`,
    bgcolor: "background.paper",
    position: "relative",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 8,
    },
  }),

  // Wrapper do ícone com fundo colorido
  iconWrapper: (cor) => ({
    bgcolor: cor + "22",
    p: 1,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  // Botão "Ver mais"
  verMaisButton: (cor) => ({
    position: "absolute",
    bottom: 12,
    right: 12,
    fontWeight: 600,
    borderColor: cor,
    color: cor,
    "&:hover": {
      borderColor: cor,
      bgcolor: cor + "11",
    },
  }),

  // Modal (fundo escurecido)
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Caixa do conteúdo do modal
  modalBox: {
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    minWidth: { xs: 320, sm: 500 },
    maxWidth: 700,
    maxHeight: "80vh",
    overflow: "auto",
  },

  // Cabeçalho do modal (ícone + título + valor)
  modalHeader: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 3,
  },

  // Ícone no modal
  modalIcon: (cor) => ({
    bgcolor: cor + "22",
    p: 1.5,
    borderRadius: 2,
  }),

  // Estado vazio (sem dados)
  emptyState: {
    color: "text.secondary",
    textAlign: "center",
    py: 3,
  },
        
  // Botão de fechar no modal
  closeButton: {
    mt: 4,
    textAlign: "center",
  },
};

export default IndicadoresCardsStyles;