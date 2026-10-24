import { Link } from 'react-router-dom';
import { MarginNote } from '@/components/Blocks';

/** "How to Use This Book" in Brazilian Portuguese (the interface language by default). */
export function HowToUsePt() {
  return (
    <div className="single" lang="pt-BR">
      <div className="running-head">
        <span>Abertura</span>
        <span>Como Usar Este Livro</span>
      </div>
      <h1 className="sc" style={{ marginBottom: '1.5rem' }}>
        Como Usar Este Livro
      </h1>
      <div className="with-margin">
        <div>
          <p className="dropcap">
            Este é um livro de referência e prática para quem já se comunica em inglês e agora quer precisão, repertório e resultado em exames.
            A interface está em português; o material de estudo — regras, exemplos, textos e exercícios — está em inglês, como num livro
            importado, e os erros típicos de brasileiros são explicados em português. Cada unidade pode ser estudada sozinha; referências como{' '}
            <Link to="/book/unit/u07?s=7.2">7.2</Link> levam à seção que explica o ponto.
          </p>
          <h2 className="subhead">A estrutura de uma unidade</h2>
          <ol>
            <li>
              <b>Apresentação</b> — forma, uso e nuances, com tabelas.
            </li>
            <li>
              <b>Exemplos</b> — frases e um texto curto em contexto.
            </li>
            <li>
              <b>Erros comuns de brasileiros</b> — explicados em português.
            </li>
            <li>
              <b>Foco em exames</b> — como o tema aparece em provas no formato TOEFL, IELTS, Cambridge e nos vestibulares brasileiros.
            </li>
            <li>
              <b>Exercícios</b> — pelo menos 80 questões em pelo menos seis formatos, todas corrigidas automaticamente.
            </li>
            <li>
              <b>Revisão rápida</b> — o essencial numa página.
            </li>
            <li>
              <b>Mais prática</b> — questões novas e ilimitadas, geradas a partir da gramática da unidade.
            </li>
          </ol>
        </div>
        <div className="margin-col">
          <MarginNote
            variant="note"
            title="Nota"
            text="Notas como esta ficam na margem. **Atenção!** marca uma armadilha comum; **Foco em exames** mostra como o ponto é cobrado."
          />
        </div>
      </div>
      <div className="with-margin">
        <div>
          <h2 className="subhead">Como as respostas são corrigidas</h2>
          <p>Antes de ser comparada com o gabarito, sua resposta é normalizada:</p>
          <ul>
            <li>espaços extras, letras maiúsculas e o ponto final são ignorados (maiúsculas só contam quando a questão avisa);</li>
            <li>apóstrofos e aspas curvos e retos são tratados como iguais;</li>
            <li>
              contrações e formas completas são equivalentes: <i lang="en">don’t = do not</i>, <i lang="en">won’t = will not</i>,{' '}
              <i lang="en">can’t = cannot = can not</i>. Os ambíguos <i lang="en">’d</i> e <i lang="en">’s</i> são lidos como{' '}
              <i lang="en">had/would</i> e <i lang="en">is/has</i> conforme a frase;
            </li>
            <li>toda variante aceitável listada pelo autor é aceita (por exemplo, grafia britânica e americana).</li>
          </ul>
          <p>Você recebe um de três resultados:</p>
          <ul>
            <li>
              <b className="sc">Correto</b>;
            </li>
            <li>
              <b className="sc">Quase</b> — sua resposta difere de uma correta por um único deslize de digitação (uma letra a mais, a menos,
              trocada ou duas letras invertidas), e a palavra digitada não é ela mesma uma forma real do inglês. Um deslize como{' '}
              <i lang="en">recieved</i> é “quase”; <i lang="en">lives</i> no lugar de <i lang="en">lived</i> é erro de gramática, então conta
              como errado;
            </li>
            <li>
              <b className="sc">Ainda não</b> — com a resposta, uma explicação e um link para a seção a revisar.
            </li>
          </ul>
          <h2 className="subhead">Transformações com palavra-chave</h2>
          <p>
            Use de duas a cinco palavras, incluindo a palavra-chave, que não pode ser alterada. Contrações contam como as palavras que
            representam (<i lang="en">didn’t</i> = 2, <i lang="en">can’t</i> = 2, <i lang="en">I’d</i> = 2); <i lang="en">cannot</i> conta
            como uma palavra, uma palavra com hífen como uma, e o ’s possessivo não acrescenta nada. A contração negativa da palavra-chave é
            aceita (<b lang="en">HAD</b> → <i lang="en">hadn’t</i>); outras contrações não (<b lang="en">WOULD</b> → <i lang="en">’d</i>).
          </p>
          <h2 className="subhead">Simulados, formato TOEFL e progresso</h2>
          <p>
            Toda resposta corrigida fica registrada neste dispositivo. As questões que você erra entram numa fila de <b>revisão espaçada</b>{' '}
            (cinco caixas, revisadas depois de 1, 2, 4, 8 e 16 dias). <Link to="/progress">Meu Progresso</Link> mostra seu aproveitamento por
            tema e seus erros mais frequentes, e permite exportar ou importar o progresso como arquivo. Depois de dez tentativas numa questão, a
            dificuldade dela é recalibrada a partir dos seus próprios resultados.
          </p>
          <p>
            Questões marcadas como <span className="source-tag">autoral</span> foram escritas e revisadas à mão; as{' '}
            <span className="source-tag">geradas</span> são produzidas por geradores de gramática a partir de tabelas verificadas, então a
            resposta é garantida — nos Simulados dá para filtrar pela origem.
          </p>
          <p>
            O simulado no formato TOEFL iBT reproduz a estrutura pública do exame com conteúdo 100% original. A nota em faixas de 1 a 6 é uma{' '}
            <b>estimativa não oficial</b>, calculada pelas suas respostas e pela sua autoavaliação; este projeto não tem vínculo com a ETS nem
            com qualquer banca.
          </p>
          <h2 className="subhead">Impressão e uso offline</h2>
          <p>
            Cada unidade imprime como páginas de livro (use o comando Imprimir do navegador); os Simulados imprimem como prova, com folha de
            respostas separada. Depois da primeira visita, o livro inteiro funciona sem internet.
          </p>
        </div>
        <div className="margin-col">
          <MarginNote
            variant="watch"
            title="Áudio"
            text="As tarefas de Listening usam as vozes do próprio navegador. Se nenhuma voz em inglês estiver disponível, a transcrição é oferecida no lugar."
          />
        </div>
      </div>
    </div>
  );
}
