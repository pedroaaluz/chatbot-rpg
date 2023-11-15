import type { IBotQuestion } from "../types/IQuestion";
import type { IStatusRules } from "../types/IStatusRules";
import { Interpreter } from "./interpreter";

export class Bot {
  questions: IBotQuestion[] = [];
  statusRules: IStatusRules[] = [];

  constructor(private readonly interpreter: Interpreter) {
    this.questions = [
      {
        id: 0,
        question: "Ele é o Obi Wan Kenobi?",
        answer: "",
        userInput: "",
        finished: false,
        answerRules: [
          {
            regex: /\bnao\b/g,
            value: "no",
          },
          {
            regex: /\bsim\b/g,
            value: "yes",
          },
          {
            regex: /\bele e o kenobi\b/g,
            value: "yes",
          },
          {
            regex: /\bele e o obi wan\b/g,
            value: "yes",
          },
          {
            regex: /\bele e o obi wan kenobi\b/g,
            value: "yes",
          },
          {
            regex: /\bele e kenobi\b/g,
            value: "yes",
          },
          {
            regex: /\bele e obi wan\b/g,
            value: "yes",
          },
          {
            regex: /\bele e obi wan kenobi\b/g,
            value: "yes",
          },
        ],
      },
      {
        id: 1,
        question:
          "O indivíduo sobre o qual estamos falando, mora **longe** ou **perto** dos centros urbanos?",
        answer: "",
        userInput: "",
        finished: false,
        answerRules: [
          {
            regex: /\blonge\b/g,
            value: "farway",
          },
          {
            regex: /\bperto\b/g,
            value: "near",
          },
        ],
      },
      {
        id: 2,
        question:
          "Qual é o nível de colaboração do indivíduo com o império: **baixo**, **moderado** ou **alto**?",
        answer: "",
        userInput: "",
        finished: false,
        answerRules: [
          {
            regex: /\bbaixo\b/g,
            value: "low",
          },
          {
            regex: /\bmoderado\b/g,
            value: "medium",
          },
          {
            regex: /\balto\b/g,
            value: "high",
          },
        ],
      },
      {
        id: 3,
        question: "O individo possui comportamento anti social?",
        answer: "",
        userInput: "",
        finished: false,
        answerRules: [
          {
            regex: /\bnao\b/g,
            value: "no",
          },
          {
            regex: /\be um nativo\b/g,
            value: "yes",
          },
          {
            regex: /\bum nativo\b/g,
            value: "yes",
          },
          {
            regex: /\bele e um nativo\b/g,
            value: "yes",
          },
          {
            regex: /\bpossui\b/g,
            value: "yes",
          },
          {
            regex: /\bse isola\b/g,
            value: "yes",
          },
        ],
      },
      {
        id: 4,
        question:
          "Estamos em um planeta isolado, inspetor, você sabe se o indivíduo **é um nativo** ou **não**?",
        answer: "",
        userInput: "",
        finished: false,
        answerRules: [
          {
            regex: /\bnao\b/g,
            value: "no",
          },
          {
            regex: /\be um nativo\b/g,
            value: "yes",
          },
          {
            regex: /\bum nativo\b/g,
            value: "yes",
          },
          {
            regex: /\bele e um nativo\b/g,
            value: "yes",
          },
        ],
      },
      {
        id: 5,
        question: "O indivíduo possui uma ficha criminal?",
        answer: "",
        userInput: "",
        finished: false,
        answerRules: [
          {
            regex: /\bnao\b/g,
            value: "no",
          },
          {
            regex: /\bsim\b/g,
            value: "yes",
          },
          {
            regex: /\bpossui\b/g,
            value: "yes",
          },
        ],
      },
    ];

    this.statusRules = [
      {
        contrabandist: {
          status: "contrabandista",
          message:
            "Um contrabandista, verifique se ele pode ser util, caso nao seja livre-se dele.",
          conditions: [
            /**
            SE Nível de colaboração com o Império = Baixo
            E É nativo do planeta = Não
            E É O OBI WAN KENOBI? = Não
            E Possui comportamento anti social = Não
          */
            {
              0: "no",
              2: "low",
              3: "no",
              4: "no",
            },
            /**
            SE Nível de colaboração com o Império = Alto
            E Possui comportamento anti social = Sim
            E É O OBI WAN KENOBI? = Não
            */
            {
              0: "no",
              2: "high",
              3: "yes",
            },
            /**
            SE Nível de colaboração com o Império = Moderado
            E É O OBI WAN KENOBI? = Não
            E Distância da cidade para sua casa = Longe
            E Possui ficha criminal = Sim
            ENTÃO Suspeito de ser = Contrabandista
            */
            {
              0: "no",
              1: "farway",
              2: "medium",
              5: "yes",
            },
          ],
        },
      },
      {
        rebel: {
          message:
            "É uma escória rebelde. Bom trabalho! Obtenha o máximo de informação possível e livre-se dele depois!",
          status: "rebelde",
          conditions: [
            /**
            SE Nível de colaboração com o Império = Baixo
            E É nativo do planeta = Sim
            E É O OBI WAN KENOBI? = Não
            */
            {
              0: "no",
              2: "low",
              4: "yes",
            },
            /**
            SE Nível de colaboração com o Império = Moderado
            E É O OBI WAN KENOBI? = Não
            E Distância da cidade para sua casa = Longe
            E Possui ficha criminal = Não
            E É nativo do planeta = Não
            */
            {
              0: "no",
              1: "farway",
              2: "low",
              4: "no",
              5: "no",
            },
          ],
        },
      },
      {
        // SE É O OBI WAN KENOBI? = Sim
        kenobi: {
          status: "kenobi",
          message:
            "É O OBI WAN KENOBI? ESTAMOS CHAMANDO O VADER, AGUARDE E PREPARE, HOJE ELE IRAR CAIR!",
          conditions: [
            {
              0: "yes",
            },
          ],
        },
      },
      {
        jedi: {
          status: "jedi",
          message:
            "Um jedi, bem perculiar, estamos enviando inquisidores, aguarde novas ordens e não morra! Jedis são feiticeiros traiçoeiros...",
          conditions: [
            /**
            E Nível de colaboração com o Império = Baixo
            E É nativo do planeta = Não
            E É O OBI WAN KENOBI? = Não
            E Possui comportamento anti social = Sim
            */
            {
              0: "no",
              2: "low",
              3: "no",
              4: "no",
            },
          ],
        },
      },
      {
        imperial: {
          conditions: [
            /**
              SE Nível de colaboração com o Império = Moderado
              E É O OBI WAN KENOBI? = Não
              E Distância da cidade para sua casa = Perto
            */
            {
              0: "no",
              1: "near",
              2: "medium",
            },
            /**
              SE Nível de colaboração com o Império = Alto
              E Possui comportamento anti social = Não
              E É O OBI WAN KENOBI? = Não
            */
            {
              0: "no",
              2: "high",
              3: "no",
            },
            /**
            SE Nível de colaboração com o Império = Moderado
            E É O OBI WAN KENOBI? = Não
            E Distância da cidade para sua casa = Longe
            E Possui ficha criminal = Não
            E É nativo do planeta = Sim
            ENTÃO Suspeito de ser = Cidadão Leal ao Império 
            */
            {
              0: "no",
              1: "farway",
              5: "no",
              4: "no",
            },
          ],
          status: "cidadão imperial",
          message:
            "Você capturou um cidadão leal ao império? Incompetente! Aguarde pela sua punição!",
        },
      },
    ];
  }

  getNextQuestion() {
    const question = this.questions.find(({ finished }) => !finished)!;

    return question;
  }

  responseQuestion(questionId: number, userInput: string) {
    const userInputNormalized = this.interpreter.normalize(userInput);

    console.log({ questionId, userInput, userInputNormalized });

    let question = this.questions[questionId];

    const answer = this.interpreter.exec(
      userInputNormalized,
      question.answerRules
    );

    if (!answer) return;

    question = {
      ...this.questions[questionId],
      userInput,
    };

    this.questions[questionId] = {
      ...question,
      finished: true,
      answer
    };

    return question;
  }

  getFinalStatus() {}
}
