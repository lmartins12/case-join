# Definir URL base e credenciais
$baseUrl = "http://localhost:8080/api/v1"
$username = "novo_usuario"
$password = "senha_segura"

# Função auxiliar para enviar requisição POST e capturar resposta JSON
function Post-Request {
    param (
        [string]$url,
        [string]$body,
        [string]$token = ""
    )
    $headers = @{
        "Content-Type" = "application/json"
    }

    if ($token) {
        $headers["Authorization"] = "Bearer $token"
    }

    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
    return $response
}

# Cadastro do usuário
Write-Output "Cadastrando usuário..."
Post-Request -url "$baseUrl/auth/register" -body (@{username=$username; password=$password} | ConvertTo-Json)

# Login e obtenção do token
Write-Output "Realizando login para obter o token..."
$loginResponse = Post-Request -url "$baseUrl/auth/login" -body (@{username=$username; password=$password} | ConvertTo-Json)
$token = $loginResponse.token

if (-not $token) {
    Write-Output "Erro ao obter o token."
    exit 1
}

Write-Output "Token obtido: $token"

# Criar 15 categorias com nomes dinâmicos e armazenar IDs
$categoryIds = @()
for ($i = 1; $i -le 15; $i++) {
    $categoryName = "Categoria Exemplo $i"
    $createCategoryResponse = Post-Request -url "$baseUrl/categories" -body (@{name=$categoryName} | ConvertTo-Json) -token $token
    $categoryIds += $createCategoryResponse.id
    Write-Output "Categoria criada: $categoryName com ID $($createCategoryResponse.id)"
}

# Criar 5 produtos para cada categoria
foreach ($categoryId in $categoryIds) {
    for ($j = 1; $j -le 5; $j++) {
        $productName = "Produto $j $categoryId"
        Post-Request -url "$baseUrl/products" -body (@{name=$productName; price=99.99; categoryId=$categoryId} | ConvertTo-Json) -token $token | Out-Null
        Write-Output "Produto criado: $productName para Categoria ID $categoryId"
    }
}

Write-Output "Script concluído com sucesso!"
