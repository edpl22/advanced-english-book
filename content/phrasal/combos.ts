/**
 * Real verb + particle combinations that are NOT entries in the dictionary.
 * A particle is never offered as a wrong option if the verb + particle is a
 * real phrasal verb (in the dictionary or here), because it might fit the
 * sentence in some reading.
 */
export const KNOWN_COMBOS = new Set(
  `act out act up add up ask out ask around back down back off bring back bring down bring in bring on bring out bring round
  break away break in break into break through call for call in call out call up calm down carry over carry off catch out catch up
  check over clear up clear out close down come along come apart come back come down come forward come in come off come on come out come over come through
  count in count out count up cut in cut off cut out cut up do up do over draw in draw on draw out draw back drop by drop back drop down
  eat in eat up end in fall apart fall behind fall down fall for fall in fall off fall over figure in fill up find in get about get ahead get around get away get back
  get down get in get into get on get out get over get round get together give in give off give out give over go about go after go against go away go back go by go down go for go in go into go out go round go under go up go with
  hand back hand down hang about hang around hang out hang up hold down hold in hold off hold out hold over hold together keep at keep away keep back keep down keep in keep off keep on keep out
  kick in kick out knock off knock out knock over lay in lay on lay out leave behind leave off let in let off let on let out let up live on live through live with log in log off log out
  look ahead look around look at look in look on look round look through look to make for make into make off make over mix up move along move away move back move down move off move over move up
  pass by pass down pass off pass out pass over pass up pay down pay in pay out pick at pick on pick out play along play around play back play off play on play out play up point to
  pull ahead pull apart pull away pull back pull down pull in pull off pull on pull out pull through pull together pull up push ahead push back push on push through
  put about put across put apart put around put aside put back put by put down put in put into put over put round put together
  read out read up rule in run across run after run against run along run around run away run back run down run in run off run on run over run through run up
  see about see in see out see to sell off sell out send back send down send in send off send on send out set about set apart set back set down set in set on set to set upon
  settle in settle on settle up show in show out show through shut in shut off shut out shut up sit back sit down sit in sit on sit out sit up slip away slip out slip up sort through
  speak out speak up stand around stand back stand by stand down stand in stand off stand up step aside step back step in step out stick around stick at stick by stick out stick to stick up stick with
  switch on switch over take apart take aside take away take down take in take out take through take to talk back talk down talk out talk round talk up
  tell apart tell off think about think ahead think back think of think through think up throw in throw off throw out throw up tie in tie up
  try for turn against turn away turn back turn in turn into turn over turn to wait about wait around wait on wait up walk away walk off walk out walk over
  wash up watch over wear away wear down wear on wear out wind down work at work in work off work on work through work up write back write in write out write up
  bring along bring over bring through bring to bring together give away give back give up hand in hand on hand round hold back hold on hold up look back look out look over
  put on put off put out put up put away put forward put through run into run out set aside set off set out set up take after take back take off take on take over take up
  turn around turn down turn off turn on turn out turn round turn up get across get along get by get off get through get up come about come across come round come up
  go ahead go off go on go over go through go without make out make up pick up check in check out check up drop in drop off drop out fall out fall through`
    .split(/\s+/)
    .reduce<string[]>((acc, w, i, a) => (i % 2 === 0 && a[i + 1] ? [...acc, `${w} ${a[i + 1]}`] : acc), []),
);
