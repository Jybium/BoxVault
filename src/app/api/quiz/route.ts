import { NextRequest, NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';



const quizData = [
  {
    question:
      "Which was the first FIFA World Cup Finals tournament to feature substitutes?",
    answer:
      "The first FIFA World Cup Finals tournament to feature substitutes was Mexico 1970: Anatoly Puzach of the USSR was the first used substitute in the opening game against Mexico.",
    wrong_answers: ["Brazil 1950", "Sweden 1958"],
  },
  {
    question: "How many FIFA World Cup Finals have Australia qualified for?",
    answer:
      "Australia qualified for Four FIFA World Cup Finals: 1974 West Germany, 2006 Germany, 2010 South Africa and 2014 Brazil.",
    wrong_answers: ["Two", "Three"],
  },
  {
    question:
      "Which host Nation of the FIFA Women’s World Cup Finals was the only one to win the competition?",
    answer:
      "The United States of America in 1999 is the only host Nation of the FIFA Women’s World Cup Finals to win the competition.",
    wrong_answers: ["China", "Sweden"],
  },
  {
    question:
      "Who scored England’s goal against Ireland in the 1990 World Cup Finals in Italy?",
    answer:
      "Gary Lineker scored England’s goal against Ireland in the 1990 World Cup Finals in Italy in the Group F match finished 1-1 with Kevin Sheedy scoring for the Republic of Ireland.",
    wrong_answers: ["David Platt", "Paul Gascoigne"],
  },
  {
    question:
      "Who were the first Asian team to qualify for a FIFA World Cup Finals tournament?",
    answer:
      "The Dutch East Indies (now Indonesia) at the 1938 World Cup in France.",
    wrong_answers: ["South Korea", "Japan"],
  },
  {
    question:
      "Which 1970 FIFA World Cup Finals England squad player had yet to win a full cap?",
    answer:
      "Leeds United’s striker Alan ‘Sniffer’ Clarke had yet to win a full England Cap before the 1970 FIFA World Cup Finals in Mexico began.",
    wrong_answers: ["Bobby Charlton", "Gordon Banks"],
  },
  {
    question:
      "Which four USA players scored at the 2014 FIFA World Cup Finals?",
    answer:
      "Clint Dempsey (2 goals), Julian Green, John Brooks and Jermaine Jones.",
    wrong_answers: ["Landon Donovan", "Tim Howard"],
  },
  {
    question:
      "Who were the Top Five Goalscorers at the 1970 FIFA World Cup Finals in Mexico?",
    answer:
      "The Top Five Goalscorers at the 1970 FIFA World Cup Finals in Mexico were Gerd Müller​ (West Germany, 10 goals), Jairzinho (Brazil, 7 goals), Teófilo Cubillas (Peru, 5 goals), Pelé (Brazil, 4 goals) and Anatoliy Byshovets (Soviet Union, 4 goals).",
    wrong_answers: ["Diego Maradona", "Michel Platini"],
  },
  {
    question:
      "Which five players affiliated to AC Milan participated in the 2018 FIFA World Cup Finals in Russia?",
    answer:
      "The five players affiliated to AC Milan who participated in the 2018 FIFA World Cup Finals in Russia Lucas Biglia​ (Argentina), André Silva (Portugal), Nikola Kalinić (Croatia), Cristián Zapata (Colombia) and Ricardo Rodríguez (Switzerland).",
    wrong_answers: ["Zlatan Ibrahimović", "Andrea Pirlo"],
  },
  {
    question:
      "Which FIFA World Cup Golden Boot Winner saw his Nation eliminated after the Group Stage Phase?",
    answer:
      "Oleg Salenko of Russia is the only player ever to win the World Cup Golden Boot award with a team eliminated from the FIFA World Cup Finals at the group stage at the 1994 Finals in the United States.",
    wrong_answers: ["Thomas Müller", "Harry Kane"],
  },
  {
    question:
      "Which four Italians have scored English Premier League Hat Tricks?",
    answer:
      "The four Italians to score English Premier League Hat Tricks are Fabrizio Ravanelli (Middlesbrough v Liverpool & Middlesbrough v Derby County), Gianluca Vialli (Chelsea v Barnsley), Gianfranco Zola (Chelsea v Derby County) and Mario Balotelli (Manchester City v Aston Villa).",
    wrong_answers: ["Francesco Totti", "Alessandro Del Piero"],
  },
  {
    question:
      "Which Premier League team had their shirts sponsored by Burmah Oil?",
    answer:
      "Swindon Town during season 1993-94. Burmah Oil’s global corporate headquarters were located in Swindon.",
    wrong_answers: ["Blackburn Rovers", "Queens Park Rangers"],
  },
  {
    question:
      "Which two players have scored Premier League hat-tricks against Manchester United?",
    answer:
      "David Bentley in Blackburn Rovers’ 4-3 win on 1st February 2006 & Dirk Kuyt in Liverpool’s 3-1 win on 6th March 2011, Romelu Lukaku in West Bromwich Albion Tie 5-5 on 19th May 2013 and Samuel Eto’o in Chelsea win 3-1.",
    wrong_answers: ["Wayne Rooney", "Cristiano Ronaldo"],
  },
  {
    question:
      "Which player scored Wimbledon FC’s only Premier League hat-trick?",
    answer:
      "Dean Holdsworth against Oldham Athletic in Wimbledon’s 3-0 win on 26th April 1994.",
    wrong_answers: ["Vinnie Jones", "John Fashanu"],
  },
  {
    question:
      "Who was the only Jamaican player to score a Premier League hat-trick to March 2020?",
    answer:
      "Kevin Lisbie for Charlton Athletic in their 3-2 win against Liverpool on 28th September 2003.",
    wrong_answers: ["Ricardo Fuller", "Theo Robinson"],
  },
  {
    question:
      "Which five Italians played Premier League Football with Manchester United?",
    answer:
      "Matteo Darmian, Federico Macheda, Rodrigo Possebon, Giuseppe Rossi and Massimo Taibi.",
    wrong_answers: ["Paolo Maldini", "Alessandro Nesta"],
  },
  {
    question:
      "Which non-UEFA player has scored the most All-Time Premier League goals?",
    answer: "Dwight Yorke (Trinidad & Tobago, 123 goals).",
    wrong_answers: ["Didier Drogba", "Thierry Henry"],
  },
  {
    question:
      "Which six players have worn Leicester City’s number nine shirt in the Premier League?",
    answer:
      "Iwan Roberts (1994-95), Steve Claridge (1996-97), Emile Heskey (1998-99), Darren Eadie (2000-02), Les Ferdinand (2003-04) and Jamie Vardy (2014-20).",
    wrong_answers: ["Jamie Vardy", "Emiliano Sala"],
  },
  {
    question:
      "Which five players scored Premier League hat-tricks for West Ham United?",
    answer:
      "Tony Cottee (v Manchester City), Paul Kitson (v Sheffield Wednesday & Charlton Athletic), Marlon Harewood (v Aston Villa), Kevin Nolan (v Reading) and Andy Carroll (v Arsenal)",
    wrong_answers: ["Carlos Tevez", "Mark Noble"],
  },
  {
    question:
      "Which four players have scored Premier League hat-tricks for three different clubs each?",
    answer:
      "Les Ferdinand (Queens Park Rangers, Newcastle United & Tottenham Hotspur), Teddy Sheringham (Tottenham Hotspur, Manchester United & Portsmouth), Kevin Campbell (Arsenal, Nottingham Forest & Everton) and Nicolas Anelka (Arsenal, Manchester City & Chelsea).",
    wrong_answers: ["Wayne Rooney", "Robin van Persie"],
  },
  {
    question: "Which six German Players won Premier League Winners Medals?",
    answer:
      "Robert Huth (2004–05, 2005–06, 2015–16), İlkay Gündoğan (2017–18, 2018-19), Leroy Sané (2017–18, 2018-19), Jens Lehmann (2003-04), Michael Ballack (2009-10) and André Schürrle (2014-15).",
    wrong_answers: ["Franz Beckenbauer", "Oliver Kahn"],
  },
  {
    question: "Which three Danish players won Premier League Medals?",
    answer:
      "Peter Schmeichel (Manchester United, 5), Anders Lindegaard (Manchester United) and Kasper Schmeichel (Leicester City).",
    wrong_answers: ["Christian Eriksen", "Nicklas Bendtner"],
  },
  {
    question: "Which nine Argentinians won Premier League Winners’ Medals?",
    answer:
      "Sergio Agüero (4 Manchester City), Carlos Tevez (2 Manchester United & 1 Manchester City), Pablo Zabaleta (2 Manchester City), Nicolás Otamendi (2 Manchester City), Juan Sebastián Verón (Manchester United), Hernán Crespo (Chelsea), Gabriel Heinze (Manchester United), Martín Demichelis (Manchester City) and Leonardo Ulloa (Leicester City).",
    wrong_answers: ["Diego Maradona", "Lionel Messi"],
  },
  {
    question:
      "Can you name six players who have appeared for 7 or more different Premier League Clubs each?",
    answer:
      "Craig Bellamy, 7 Clubs (Coventry City, Newcastle United, Blackburn Rovers, Liverpool, West Ham United, Manchester City & Cardiff City). Andrew Cole, 7 Clubs (Newcastle United, Manchester United, Blackburn Rovers, Fulham, Manchester City, Portsmouth and Sunderland), Wayne Routledge, 7 Clubs (Crystal Palace, Tottenham Hotspur, Portsmouth, Fulham, Aston Villa, Newcastle United and Swansea City), Tal Ben Haim, 7 Clubs (Bolton Wanderers, Chelsea, Manchester City, Sunderland, Portsmouth, West Ham United and Queens Park Rangers), Peter Crouch, 7 Clubs (Aston Villa, Southampton, Liverpool, Portsmouth, Tottenham Hotspur, Stoke City & Burnley) and Marcus Bent, 8 Clubs (Crystal Palace, Blackburn Rovers, Ipswich Town, Leicester City, Everton, Charlton Athletic, Wigan Athletic & Wolverhampton Wanderers).",
    wrong_answers: ["Steven Gerrard", "Frank Lampard"],
  },
  {
    question:
      "Which three players hold the record for the most Premier League red cards?",
    answer:
      "Richard Dunne, Patrick Vieira and Duncan Ferguson all with 8 red cards each.",
    wrong_answers: ["Roy Keane", "John Terry"],
  },
  {
    question: "Which six Frenchmen have scored the most Premier League Goals?",
    answer:
      "Thierry Henry​ (175 goals), Nicolas Anelka (125 goals), Louis Saha (85 goals), Olivier Giroud (78 goals), Eric Cantona (70 goals) and Robert Pires (62 goals).",
    wrong_answers: ["Zinedine Zidane", "Franck Ribéry"],
  },
  {
    question:
      "Which six African Players scored the most All-Time Premier League Goals?",
    answer:
      "Didier Drogba (Ivory Coast 104), Emmanuel Adebayor (Togo 97), Yakubu (Nigeria 95), Sadio Mané (Senegal 80), Mohamed Salah (Egypt 72) and Yaya Touré (Ivory Coast 62).",
    wrong_answers: ["Samuel Eto'o", "George Weah"],
  },
  {
    question:
      "Which four players have scored Premier League hat-tricks against Manchester United?",
    answer:
      "Four players who scored Premier League hat-tricks against Manchester United are David Bentley in Blackburn Rovers’ 4-3 win on 1st February 2006; Dirk Kuyt in Liverpool’s 3-1 win on 6th March 2011; Romelu Lukaku in West Bromwich Albion Tie 5-5 on 19th May 2013; and Samuel Eto’o in Chelsea win 3-1 on 19th January 2014.",
    wrong_answers: ["Cristiano Ronaldo", "Wayne Rooney"],
  },
  {
    question:
      "Which three Managers have been in charge of both Chelsea FC & Tottenham Hotspur?",
    answer: "André Villas-Boas, Glenn Hoddle and Jose Mourinho.",
    wrong_answers: ["Arsène Wenger", "Alex Ferguson"],
  },
  {
    question:
      "Who are the six All-Time Highest Premier League Goalscorers from The Americas?",
    answer:
      "Sergio Agüero (Argentina 180), Dwight Yorke (Trinidad & Tobago 123), Carlos Tevez (Argentina 84), Luis Suarez (Uruguay 69), Alexis Sánchez (Chile 63) and Clint Dempsey (United States 57).",
    wrong_answers: ["Romário", "Hernán Crespo"],
  },
  {
    question:
      "Who was the last Manchester United player to win the Ballon d’Or before Cristiano Ronaldo?",
    answer:
      "George Best was the last Manchester United player to win the Ballon d’Or before Cristiano Ronaldo.",
    wrong_answers: ["Bobby Charlton", "Ryan Giggs"],
  },
  {
    question:
      "Which current Premier League team has launched a bid to be officially recognised as the oldest professional club in the world?",
    answer:
      "Crystal Palace was the Premier League team who has launched a bid to be officially recognised as the oldest professional club in the world",
    wrong_answers: ["Manchester City", "Liverpool"],
  },
  {
    question:
      "Which player has made the most appearances in Premier League history?",
    answer:
      "Gareth Barry (632) has made the most appearances in Premier League history",
    wrong_answers: ["Ryan Giggs", "Frank Lampard"],
  },
  {
    question: "Which team has spent the most seasons in Serie A? (88)",
    answer: "Inter has spent the most seasons in Serie A? (88)",
    wrong_answers: ["AC Milan", "Juventus"],
  },
  {
    question: "Which Premier League or EFL team is known as: The Chairboys",
    answer: "Wycombe Wanderers is known as The Chairboys",
    wrong_answers: ["Bristol Rovers", "Plymouth Argyle"],
  },
  {
    question: "Which Premier League or EFL team is known as: The Cod Army",
    answer: "Fleetwood Town",
    wrong_answers: ["Grimsby Town", "Tranmere Rovers"],
  },
  {
    question: "Which Premier League or EFL team is known as: The Hornets",
    answer: "Watford",
    wrong_answers: ["Burnley", "Bournemouth"],
  },
  {
    question: "Which Premier League or EFL team is known as: The Railwaymen",
    answer: "Crewe Alexandra",
    wrong_answers: ["Port Vale", "Bury"],
  },
  {
    question: "Which Premier League or EFL team is known as: The Valiants",
    answer: "Port Vale",
    wrong_answers: ["Lincoln City", "Carlisle United"],
  },
  {
    question:
      "Fans of Dutch side ADO Den Haag stormed the club’s training ground in February 2020 to confront their manager – a British former Premier League boss – over his poor tactics. Name the manager.",
    answer: "Alan Pardew",
    wrong_answers: ["Sam Allardyce", "Steve McClaren"],
  },
  {
    question:
      "Which player was sold for the highest transfer fee ever received by a Premier League team?",
    answer: "Philippe Coutinho (£105m – Liverpool to Barcelona)",
    wrong_answers: ["Gareth Bale", "Neymar"],
  },
  {
    question:
      "Brazil have won the World Cup more times than any other team with five triumphs. Which two nations are joint-second with four World Cup titles?",
    answer: "Italy and Germany",
    wrong_answers: ["Argentina and France", "England and Spain"],
  },
  {
    question:
      "Which former Premier League team was sponsored by TY – owners of the Beanie Babies franchise – between 2002 and 2005?",
    answer: "Portsmouth",
    wrong_answers: ["Leeds United", "Sunderland"],
  },
  {
    question:
      "Which Sheffield United striker scored the first goal ever in the Premier League in 1992/93?",
    answer: "Brian Deane",
    wrong_answers: ["Alan Shearer", "Les Ferdinand"],
  },
  {
    question:
      "With 170 caps to her name, which player has made the most appearances for the England women’s national team?",
    answer: "Fara Williams",
    wrong_answers: ["Kelly Smith", "Rachel Yankey"],
  },
];


export async function GET() {

    
  try {

    // Shuffle the array
    const shuffledData = quizData.sort(() => Math.random() - 0.5);

    // Get the first 10 elements
    const randomObjects = shuffledData.slice(0, 10);

    // Send the response
    return NextResponse.json({data: randomObjects}, {status: 200});
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
  }
}
