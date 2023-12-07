// Importação de componentes React
import BannerImgDuplo from "@/components/BannerDuplo";
import BannerImg from "@/components/BannerImg";
import NavBar from "@/components/NavBar";
import Logo from "@/components/Logo";

// Componente funcional Home
export default function Home() {
    return (
        // Div principal com classe de estilo
        <div className="bg-[#232323] h-full">
            
            {/* Componente NavBar */}
            <NavBar />

            {/* Componente BannerImg com informações específicas */}
            <BannerImg
                img="cellHome"
                title="A nova Geração Bancária"
                text="No BANK!, acreditamos que a gestão financeira não precisa ser uma tarefa árdua. É por isso que simplificamos o processo, trazendo um toque de modernidade e facilidade para o mundo das finanças. Você merece mais do que burocracia e papelada. Merece praticidade e controle total sobre seu dinheiro."
                colorText="text-[#7200E3]"
            />

            {/* Componente BannerImg com outras informações específicas */}
            <BannerImg
                img="transactionForms"
                title="Diversas Opções de Transações no BANK!"
                text="O banco BANK! oferece uma ampla gama de serviços de transações, incluindo transferências eletrônicas, pagamento de contas e caixas eletrônicos. Os clientes podem realizar transações com facilidade por meio do aplicativo móvel e internet banking. Além disso, o banco oferece opções para transferências programadas e pagamentos de contas, proporcionando conveniência e eficiência nas operações financeiras."
                backGround
                reverse
                colorText="text-[#232323]"
            />

            {/* Componente BannerImg com mais informações */}
            <BannerImg
                img="pix"
                title="Transações Simples Entre Contas"
                text="Através do banco BANK!, os clientes desfrutam de facilidades para efetuar transações entre suas contas. Com operações simples, é possível mover fundos entre contas internas, otimizando o gerenciamento financeiro. Essa opção proporciona agilidade e conveniência para a gestão de recursos, tudo isso dentro do ambiente seguro e confiável do banco."
                colorText="text-[#1FF2FF]"
            />

            {/* Componente BannerImgDuplo com informações duplas */}
            <BannerImgDuplo
                img1="investments"
                title1="Investimentos Inteligentes no Bank"
                text1="Os investimentos no Bank proporcionam oportunidades financeiras inteligentes. Oferecemos uma variedade de opções, orientação especializada e segurança para ajudá-lo a alcançar seus objetivos financeiros com confiança. Invista com o Bank e faça seu dinheiro trabalhar para você."
                colorText1="text-[#FF1577]"
                img2="security"
                title2="Segurança Inabalável no Bank"
                text2="A segurança no Bank é nossa prioridade. Utilizamos medidas rigorosas para proteger suas informações e transações financeiras. Conte com nossa confiabilidade e compromisso com a proteção de seus ativos e dados pessoais. Sinta-se tranquilo ao escolher o Bank para suas necessidades financeiras."
                colorText2="text-[#FFBD15]"
            />
        </div>
    );
}
