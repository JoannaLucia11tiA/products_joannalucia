ALTER TABLE `products_joannalucia`
CHANGE `name` `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
ADD COLUMN preco DECIMAL(10, 2),
ADD COLUMN descricao TEXT,
ADD COLUMN categoria VARCHAR(255);