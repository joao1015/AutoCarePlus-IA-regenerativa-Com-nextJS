![Challenge 2024](https://drive.google.com/uc?export=view&id=1-Mpxt3PqS82cyg7so4cIwKFAkeh4-Ko0)
 
# 🚗 **FIAP-2014 / CHALLENGE - PORTO SEGURO - SPRINT 4**
 
## Índice
1. [Projeto](#projeto)
2. [Grupo](#grupo)
3. [Turmas e Professores](#turmas-e-professores)
4. [Repositório do Projeto](#repositorio-do-projeto)
5. [Equipe](#equipe)
6. [Sobre o Projeto](#sobre-o-projeto)
7. [Problemas Identificados](#problemas-identificados)
 
---
 
## <a name="projeto"></a>**Projeto:** AutoCarePlusReact  
 
---
 
## <a name="grupo"></a>**Grupo:** MetaMind!  
 
---
 
## 🎓 **Turmas e Professores:**
 
- **TDSPV**
- **TDSPZ**
 
### Professores:
- **TDSPV:** [Alexandre Carlos de Jesus](https://github.com/alecarlosjesus)
- **TDSPZ:** [Caio Halbert Jacinto](https://github.com/CaioHalbert)
 
[🔝 Voltar ao topo](#)
 
---
 
## <a name="repositorio-do-projeto"></a>📂 **Repositório do Projeto:**
 
[https://github.com/joao1015/AutoCarePlus-IA-regenerativa-Com-nextJS - Repositório]()
 
[🔝 Voltar ao topo](#)
 
---
 
## <a name="equipe"></a>👥 **Equipe:**
 
| Nome                        | RM      | Turma   | GitHub                                          | Foto                                          |
|-----------------------------|---------|---------|-------------------------------------------------|-----------------------------------------------|
| **Arthur Bispo de Lima**     | 557568  | 1TDSPV  | [GitHub Arthur](https://github.com/ArthurBispo00?tab=repositories) | ![Arthur Bispo](https://drive.google.com/uc?export=view&id=1qkq69PTvJU6VSS_cWNDiyknRQSCBUakg) |
| **João Paulo Moreira**       | 557808  | 1TDSPV  | [GitHub João Paulo](https://github.com/joao1015?tab=repositories) | ![João Paulo](https://drive.google.com/uc?export=view&id=1wxoVt-5v4ifCAGZHkINnNNZuMXSqowpz) |
| **Paulo André Carminati**    | 557881  | 1TDSPZ  | [GitHub Paulo André](https://github.com/carmipa) | ![Paulo André](https://drive.google.com/uc?export=view&id=19bA5l9huX-K2Kkr7uHWHl4tjGjR6ssSZ) |
 
[🔝 Voltar ao topo](#)
 
---
 
## <a name="sobre-o-projeto"></a>📑 **Sobre o Projeto:**
## Link do Projeto na vercel https://autocare-joao-paulo-moreira-dos-santos-projects.vercel.app/:
### 💡 **IA para Diagnóstico de Falhas**  
Desenvolvemos uma inteligência artificial capaz de identificar falhas em veículos e oferecer soluções detalhadas.
 
### 🔧 **Busca e Comparação de Oficinas**  
Nossa plataforma permite encontrar oficinas credenciadas, comparar preços, tempo de serviço e avaliações de forma fácil e rápida.
 
### 🛠 **Funcionalidades Adicionais**  
- **Serviços Extras:** Personalize a experiência escolhendo serviços como leva e traz, alinhamento, entre outros.
- **Escolha de Peças:** Opte por peças renovadas ou novas, conforme sua preferência.
 
### 📅 **Agendamento e Execução**  
- **Processo Simples:** O cliente agenda o serviço, escolhe a oficina e recebe atendimento personalizado.
- **Aprendizado Contínuo:** Oficinas preenchem ordens de serviço, e a IA aprimora o banco de dados, melhorando futuras interações.
 
[🔝 Voltar ao topo](#)
 
---
 
## <a name="problemas-identificados"></a>🚩 **Problemas Identificados:**
 
1. **Dificuldade no Diagnóstico de Falhas:**
   - Proprietários frequentemente enfrentam problemas para identificar falhas em seus veículos, resultando em diagnósticos incorretos e reparos inadequados.
2. **Escolha Desafiadora de Oficinas:**
   - Consumidores têm dificuldade em encontrar oficinas confiáveis que ofereçam serviços de qualidade, com transparência nos preços e conveniência no atendimento.
 
## Bibliotecas Utilizadas
 
1. styled-components: npm install styled-components
 
2. react-icons: npm install react-icons
 
 
## Informações de Falhas para teste da IA
 
Exemplos de Interação com o Sistema
Abaixo estão exemplos de como interagir com o sistema de diagnóstico de falhas e agendamento de serviço.
 
Exemplo 1 de Interação
Digite as seguintes informações no chatbot:
 
Marca: Volks
Modelo: Polo
Versão: MSI ou MPI
Ano: Qualquer um
Responda "sim" quando solicitado.
Falhas: Sensor ABS com falha / Luz do ABS acesa / Ao girar o volante apresenta barulho na direção
Processo de Diagnóstico: O sistema processará as informações e retornará um orçamento estimado para o serviço necessário.
 
Agendamento de Serviço: Após o orçamento, o sistema perguntará se você deseja agendar o serviço. Ao responder "sim", o sistema aguardará 3 segundos e, em seguida, redirecionará para a página do cliente onde você poderá escolher a oficina para o serviço.
 
Escolha da Oficina: Na página do cliente, selecione uma oficina desejada para realizar o serviço. Ao clicar, o sistema registrará o agendamento e fornecerá uma ordem de serviço.
 
Consulta de Status: Na barra lateral, existe um link de Status. Ao clicar nele, será solicitado o e-mail do cliente. O sistema buscará o status das ordens de serviço e exibirá o status atual fornecido pela oficina responsável.
 
Exemplo 2 de Interação
Digite as seguintes informações no chatbot:
 
Marca: Volks
Modelo: Virtus
Versão: MSI ou TSI Comfort
Ano: Qualquer um
Responda "sim" quando solicitado.
Falhas: Sensor ABS com falha / Luz do ABS acesa / Ao girar o volante apresenta barulho na direção
Processo de Diagnóstico e Agendamento: O sistema seguirá o mesmo processo descrito no Exemplo 1, retornando o orçamento, perguntando sobre o agendamento e, em caso positivo, redirecionando para a página de escolha de oficina.
 
Exemplo 3 de Interação
Digite as seguintes informações no chatbot:
 
Marca: Chevrolet
Modelo: Celta
Versão: LS, LT ou Advantage
Ano: Qualquer um
Responda "sim" quando solicitado.
Falhas: Batida seca perto da roda / Barulhos vindos da roda / Meu Celta apresenta muitos problemas de barulhos provenientes da roda
Processo de Diagnóstico e Agendamento: O sistema seguirá o mesmo processo descrito no Exemplo 1, fornecendo orçamento e possibilidade de agendamento.
 
Observação
No campo de Versão, a barra "/" indica alternativas. Por exemplo, LS/LT significa que você pode inserir LS ou LT.
 
Esses exemplos cobrem diferentes cenários de uso para o diagnóstico, orçamento e agendamento de serviços com o chatbot, tornando a experiência intuitiva e funcional.
 
 
## Informações de Login para Oficinas Credenciadas
 
| Nome da Oficina           | E-mail                   | Senha  |
|---------------------------|--------------------------|--------|
| Oficina Faria Lima           | oficina1@example.com     | 123    |
| Oficina Barra funda    | oficina2@example.com     | 123    |
| Oficina Vila Sonia           | oficina3@example.com     | 123    |
 
Instruções de Acesso e Uso do Sistema de Gestão de Ordens
Acessando o Sistema:
 
Acesse o sistema de oficinas credenciadas através do link fornecido.
Insira o e-mail e a senha da sua oficina (informações conforme detalhado na tabela de credenciais).
Navegando na Sidebar:
 
A barra lateral (sidebar) oferece três opções principais: Ordens Recebidas, Gestão de Ordens, e Garantia. Essas opções permitem a gestão completa das ordens recebidas dos clientes, incluindo aceitação, atualização de status e controle de ordens finalizadas.
Gerenciamento de Ordens Recebidas:
 
Acesse Ordens Recebidas na sidebar para visualizar todas as ordens enviadas pelos clientes.
Você pode Aceitar ou Rejeitar uma ordem de serviço:
Aceitar: A ordem será movida para a tabela de Gestão de Ordens.
Rejeitar: A ordem será removida do sistema e não será processada.
Gestão de Ordens:
 
Após aceitar uma ordem, vá para Gestão de Ordens na sidebar para gerenciar o status da ordem de serviço.
Aqui, você pode realizar as seguintes ações:
Atualizar o Status: Altere o status da ordem para que o cliente seja notificado do progresso. Exemplos de status incluem "Em Andamento", "Aguardando Peças", "Concluído", entre outros.
Diagnóstico da Falha: Se a falha diagnosticada pela IA estiver incorreta, será exibido um campo para inserir a falha real e os valores ajustados. Após preencher essas informações, você pode prosseguir para finalizar a ordem.
Finalização da Ordem e Gestão de Garantia:
 
Quando uma ordem for concluída, selecione a opção Finalizar na Gestão de Ordens.
A ordem finalizada será movida para a seção Garantia na sidebar, onde ficará disponível para controle de garantia.
Nesta etapa, o cliente poderá enviar feedback adicional, caso necessário, e visualizar a finalização completa do serviço realizado.
Consulta de Status pelo Cliente:
 
O cliente pode verificar o status atualizado da ordem acessando a seção de Status em sua área do cliente, onde será solicitado o e-mail.
O sistema exibirá as atualizações fornecidas pela oficina, mantendo o cliente informado sobre o andamento da sua ordem.
Esses passos guiam o processo desde a recepção de uma ordem até sua finalização, proporcionando uma experiência de gestão fluida e informativa para oficinas e clientes.
 
 
Sistema de Análise de Oficinas
Para acessar o sistema de análise de oficinas, siga os passos abaixo:

Configuração Prévia:

Inicie o Backend: Certifique-se de rodar o backend em Python no servidor local (localhost). Esse backend é essencial para gerenciar as operações de criação, leitura, atualização e exclusão (CRUD) das oficinas.
Arquivo de Configuração: Crie um arquivo .env.local na raiz do projeto com o seguinte conteúdo:
env

Copiar código
NEXT_PUBLIC_API_URL=http://localhost:5003

Esse arquivo configura a URL de acesso à API, permitindo a comunicação entre o frontend e o backend.
Acesso ao Sistema:

No site, clique em "Análise" para abrir a área de login.
Utilize as seguintes credenciais para acessar o sistema:
Login: admin
Senha: admin123
Funcionalidades:

Adicionar Oficina: Registre novas oficinas no sistema.
Editar Oficina: Atualize as informações das oficinas existentes.
Excluir Oficina: Remova oficinas do sistema conforme necessário.
Ler Oficinas: Consulte e visualize as informações das oficinas cadastradas.
Esse sistema permite ao administrador gerenciar eficientemente os dados das oficinas, facilitando o controle e a atualização das informações em tempo real.


 
### Acesso ao Figma
 
1. Link de Acesso ao Figma: https://www.figma.com/design/LqyECsacKv92Y7fyMlZBiU/AutoCarePlus?node-id=0-1&node-type=canvas&t=FLThciAiR1spFadk-0
 
E-mail: metamindsolutions@hotmail.com Senha:654321Aa!
 
Obs: Existe 2 Pages:
 
Page 1 se encontra o projeto antigo totalmente preservado para comparação.
 
Page 2 se enconta o estado atual do projeto da pagina devidamente identificado com as paletas de cores e toda estrutura visual do site.
 
### Acesso ao Youtube com explicação do Projeto
 
1. Link de Acesso ao Youtube:
 
[🔝 Voltar ao topo](#)