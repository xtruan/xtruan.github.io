//
// Purpose: A simple blackjack program which can either Play
//          a regular game, simulate many games or practice
//          certain situations.  I wrote this becase one,
//          I would like to be able to practice certain
//          situations (such as splits or Soft hands), 
//          without having to go through many hands to do so.
//          Two, I wanted to verify that you could actually
//          beat the game if counting cards.
//          The simulation came out a little better than
//          expected, I believe because the random number
//          generator needs some work.  I wrote my own using
//          an algorithm from an old textbook which did not
//          help much.  I have also tried the
//          Math::Math-TrulyRandom-1.0 without much luck.
//          The Math-TrulyRandom-1.0 just hangs on my PC.
//          
//          I am basically just a good Pascal/C Programmer, so
//          my code while not elegant should be fairly simple.
//          Blackjack is a pretty simple game anyway.
//
//          Copyright: sterlperl.com Steling Levell 2002.
//
// Author:  Sterling Levell
// e-mail:  sterlperl@ont.com
// Rev:     

function main() {
var $decks = 6;
var $suits = 4;
var $types = 13;
var $players = 1;

var $practice = 1;
var $simulate = 0;
var $bet_spread = 10;
var $shuffle_point = 5/6;
var $vary_strategy = 0;
var $shuffle_at = 5;
var $randomness = 1;

//
// graphic variables
//
var $graphic = 1; 
var $cards_dir = "";

var $unit = 1; // betting unit
//
// rules
//
var $hit_soft_17 = 0;
var $splits_allowed = 3;

//
// Decision Tables
// Variable Tables from Canfield's excellent "Black Jack your way to Riches"
// Buy the book if you can still find it, hard to find out of print now.
// I hope he will reissue

//            0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $hard_totals = 
          [ 
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 0n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 1n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 2n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 3n/a
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 4
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 5
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 6
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 7
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 8
             [0,"H","H","D","D","D","D","H","H","H","H","H","H","H"], // 9
             [0,"H","D","D","D","D","D","D","D","D","H","H","H","H"], // 10
             [0,"H","D","D","D","D","D","D","D","D","D","D","D","D"], // 11
             [0,"H","H","H","S","S","S","H","H","H","H","H","H","H"], // 12
             [0,"H","S","S","S","S","S","H","H","H","H","H","H","H"], // 13
             [0,"H","S","S","S","S","S","H","H","H","H","H","H","H"], // 14
             [0,"H","S","S","S","S","S","H","H","H","H","H","H","H"], // 15
             [0,"H","S","S","S","S","S","H","H","H","H","H","H","H"], // 16
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 17
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 18
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 19
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 20
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"] // 21
          ];     
//            0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $hard_totals2 =
          [
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 0n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 1n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 2n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 3n/a
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 4
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 5
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 6
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 7
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 8
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 9
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 10
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 11
             [0,"H","H","H","S","S","S","H","H","H","H","H","H","H"], // 12
             [0,"H","S","S","S","S","S","H","H","H","H","H","H","H"], // 13
             [0,"H","S","S","S","S","S","H","H","H","H","H","H","H"], // 14
             [0,"H","S","S","S","S","S","H","H","H","H","H","H","H"], // 15
             [0,"H","S","S","S","S","S","H","H","H","H","H","H","H"], // 16
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 17
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 18
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 19
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 20
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"] // 21
          ]; 
//            0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $hard_vary =
          [
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 0n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 1n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 2n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 3n/a
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 4
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 5
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 6
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 7
             [0,"H","H","H", -6, -4, -3,"H","H","H","H","H","H","H"], // 8
             [0,"H", -1,  0,  2,  5,  5, -4,"H","H","H","H","H","H"], // 9
             [0, -5,"D","D","D","D","D","D",  5,  2, -6, -6, -6, -6], // 10
             [0, -1,"D","D","D","D","D","D",  6,  5,  3,  3,  3,  3], // 11
             [0,"H", -2, -1,  0,  2,  1,"H","H","H","H","H","H","H"], // 12
             [0,"H",  1,  2,  3,  5,  5,"H","H","H","H","H","H","H"], // 13
             [0,"H",  4,  5,  6,"S","S","H","H","H","H","H","H","H"], // 14
             [0,"H",  6,"S","S","S","S","H","H","H", -4, -4, -4, -4], // 15
             [0,"H","S","S","S","S","S","H","H", -5,  0,  0,  0,  0], // 16
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 17
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 18
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 19
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 20
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"] // 21
          ];
//            0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $hard_vary2 =
          [
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 0n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 1n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 2n/a
             [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], // 3n/a
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 4
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 5
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 6
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 7
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 8
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 9
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 10
             [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // 11
             [0,"H", -2, -1,  0,  2,  1,"H","H","H","H","H","H","H"], // 12
             [0,"H",  1,  2,  3,  5,  5,"H","H","H","H","H","H","H"], // 13
             [0,"H",  4,  5,  6,"S","S","H","H","H","H","H","H","H"], // 14
             [0,"H",  6,"S","S","S","S","H","H","H", -4, -4, -4, -4], // 15
             [0,"H","S","S","S","S","S","H","H", -5,  0,  0,  0,  0], // 16
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 17
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 18
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 19
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // 20
             [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"] // 21
          ];
//               0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $soft_totals = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
                [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // A-A
                [0,"H","H","H","H","D","D","H","H","H","H","H","H","H"], // A-2
                [0,"H","H","H","H","D","D","H","H","H","H","H","H","H"], // A-3
                [0,"H","H","H","D","D","D","H","H","H","H","H","H","H"], // A-4
                [0,"H","H","H","D","D","D","H","H","H","H","H","H","H"], // A-5
                [0,"H","H","D","D","D","D","H","H","H","H","H","H","H"], // A-6
                [0,"H","S","D","D","D","D","S","S","H","H","H","H","H"], // A-7
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-8
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-9
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-10
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-J
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-Q
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"] // A-K
               ];
//               0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $soft_totals2 = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
                [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // A-A
                [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // A-2
                [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // A-3
                [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // A-4
                [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // A-5
                [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // A-6
                [0,"H","S","S","S","S","S","S","S","H","H","H","H","H"], // A-7
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-8
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-9
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-10                
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-J
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-Q
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"] // A-K
                ];
//               0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $soft_vary = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
                [0,"H","H","H","H","H","H","H","H","H","H","H","H","H"], // A-A
                [0,"H","H","H", -3,  1,  2,"H","H","H","H","H","H","H"], // A-2
                [0,"H","H", -6, -2,  2,  5,"H","H","H","H","H","H","H"], // A-3
                [0,"H","H", -5,  1,  5,"D","H","H","H","H","H","H","H"], // A-4
                [0,"H","H", -4,  1,  6,"D","H","H","H","H","H","H","H"], // A-5
                [0,"H", -1,  2,  6,"D","D","H","H","H","H","H","H","H"], // A-6
                [0,"H", -2,  1,  6,"D","D","S","S","H","H","H","H","H"], // A-7
                [0,"S", -5, -4, -2, -2,"S","S","S","S","S","S","S","S"], // A-8
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-9
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-10                    
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-J
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"], // A-Q
                [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"] // A-K
             ];
//                0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $split_totals = [ 
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 n/a
                 [0,"P","P","P","P","P","P","P","P","P","P","P","P","P"], // A-A
                 [0,"H","P","P","P","P","P","P","H","H","H","H","H","H"], // 2-2
                 [0,"H","P","P","P","P","P","P","H","H","H","H","H","H"], // 3-3
                 [0,"H","H","H","H","P","P","H","H","H","H","H","H","H"], // 4-4
                 [0,"H","D","D","D","D","D","D","D","D","H","H","H","H"], // 5-5
                 [0,"H","P","P","P","P","P","H","H","H","H","H","H","H"], // 6-6
                 [0,"H","P","P","P","P","P","P","H","H","H","H","H","H"], // 7-7
                 [0,"P","P","P","P","P","P","P","P","P","P","P","P","P"], // 8-8
                 [0,"S","P","P","P","P","P","S","P","P","S","S","S","S"], // 9-9
                 [0,"S","S","S","S","S","S","S","S","S","S","S","S","S"] // 10-10
                ];
//                0  A   2   3   4   5   6   7   8   9   T   J   Q   K
var $split_vary = [ 
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 n/a
                 [0,"P","P","P","P","P","P","P","P","P","P","P","P","P"], // A-A
                 [0,"H","P","P","P","P","P","P","H","H","H","H","H","H"], // 2-2
                 [0,"H","P","P","P","P","P","P","H","H","H","H","H","H"], // 3-3
                 [0,"H","H","H", -4, -2,  0,"H","H","H","H","H","H","H"], // 4-4
                 [0,"H","D","D","D","D","D","D","D","D","H","H","H","H"], // 5-5
                 [0,"H","P",  1,  3,  5,"P","H","H","H","H","H","H","H"], // 6-6
                 [0,"H","P","P","P","P","P","P","H","H","H","H","H","H"], // 7-7
                 [0,"P","P","P","P","P","P","P","P","P","P","P","P","P"], // 8-8
                 [0, -5,  3,  4,  6,"P","P", -4,"P","P","S","S","S","S"], // 9-9
                 [0,"S","S","S","S", -5, -5,"S","S","S","S","S","S","S"] // 10-10
              ];

//preload images
//document.open();
//document.write ("<html>\n");
//document.write ("<body bgcolor=\"lightskyblue\">\n");
//document.write ("<basefont size=4>\n");
//document.write ("Loading Images, Please Wait\n");
//document.write ("</body>\n");
//document.write ("</html>\n");
//document.close ();
$ac = new Image (202,292);
$ac.src = "images/cards/ac.png";
$ad = new Image (202,292);
$ad.src = "images/cards/ad.png";
$as = new Image (202,292);
$as.src = "images/cards/as.png";
$ah = new Image (202,292);
$ah.src = "images/cards/ah.png";

$2c = new Image (202,292);
$2c.src = "images/cards/2c.png";
$2d = new Image (202,292);
$2d.src = "images/cards/2d.png";
$2s = new Image (202,292);
$2s.src = "images/cards/2s.png";
$2h = new Image (202,292);
$2h.src = "images/cards/2h.png";

$3c = new Image (202,292);
$3c.src = "images/cards/3c.png";
$3d = new Image (202,292);
$3d.src = "images/cards/3d.png";
$3s = new Image (202,292);
$3s.src = "images/cards/3s.png";
$3h = new Image (202,292);
$3h.src = "images/cards/3h.png";

$4c = new Image (202,292);
$4c.src = "images/cards/4c.png";
$4d = new Image (202,292);
$4d.src = "images/cards/4d.png";
$4s = new Image (202,292);
$4s.src = "images/cards/4s.png";
$4h = new Image (202,292);
$4h.src = "images/cards/4h.png";

$5c = new Image (202,292);
$5c.src = "images/cards/5c.png";
$5d = new Image (202,292);
$5d.src = "images/cards/5d.png";
$5s = new Image (202,292);
$5s.src = "images/cards/5s.png";
$5h = new Image (202,292);
$5h.src = "images/cards/5h.png";

$6c = new Image (202,292);
$6c.src = "images/cards/6c.png";
$6d = new Image (202,292);
$6d.src = "images/cards/6d.png";
$6s = new Image (202,292);
$6s.src = "images/cards/6s.png";
$6h = new Image (202,292);
$6h.src = "images/cards/6h.png";

$7c = new Image (202,292);
$7c.src = "images/cards/7c.png";
$7d = new Image (202,292);
$7d.src = "images/cards/7d.png";
$7s = new Image (202,292);
$7s.src = "images/cards/7s.png";
$7h = new Image (202,292);
$7h.src = "images/cards/7h.png";

$8c = new Image (202,292);
$8c.src = "images/cards/8c.png";
$8d = new Image (202,292);
$8d.src = "images/cards/8d.png";
$8s = new Image (202,292);
$8s.src = "images/cards/8s.png";
$8h = new Image (202,292);
$8h.src = "images/cards/8h.png";

$9c = new Image (202,292);
$9c.src = "images/cards/9c.png";
$9d = new Image (202,292);
$9d.src = "images/cards/9d.png";
$9s = new Image (202,292);
$9s.src = "images/cards/9s.png";
$9h = new Image (202,292);
$9h.src = "images/cards/9h.png";

$tc = new Image (202,292);
$tc.src = "images/cards/tc.png";
$td = new Image (202,292);
$td.src = "images/cards/td.png";
$ts = new Image (202,292);
$ts.src = "images/cards/ts.png";
$th = new Image (202,292);
$th.src = "images/cards/th.png";

$jc = new Image (202,292);
$jc.src = "images/cards/jc.png";
$jd = new Image (202,292);
$jd.src = "images/cards/jd.png";
$js = new Image (202,292);
$js.src = "images/cards/js.png";
$jh = new Image (202,292);
$jh.src = "images/cards/jh.png";

$qc = new Image (202,292);
$qc.src = "images/cards/qc.png";
$qd = new Image (202,292);
$qd.src = "images/cards/qd.png";
$qs = new Image (202,292);
$qs.src = "images/cards/qs.png";
$qh = new Image (202,292);
$qh.src = "images/cards/qh.png";

$kc = new Image (202,292);
$kc.src = "images/cards/kc.png";
$kd = new Image (202,292);
$kd.src = "images/cards/kd.png";
$ks = new Image (202,292);
$ks.src = "images/cards/ks.png";
$kh = new Image (202,292);
$kh.src = "images/cards/kh.png";


//document.write("<basefont size=7>\n");
//for ($j = 1; $j <= 10; $j++) {
//   document.write("<pre>");
//   for ($i = 1; $i <= 13; $i++) {
//      document.write($split_vary[$j][$i]);
//   }
//   document.write("<pre>");
//} 

var $deck = new Array ($decks*$suits*$types);
var $card = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var $top_card;

var $dev_ace;
var $run_count;
var $exact_count;
var $run_ace;
var $exact_ace;
var $shuffle_needed;
var $deck_count;


function shuffle () {

$run_count = 0;
$exact_count = 0;
$run_ace = 0;
$exact_ace = 0;
$shuffle_needed = 0;
var $c;
var $i;
//   document.write ("shuffling...\n");
//   document.close();

   $i = 1;
   while ($i <= $decks*$suits*$types) {
      $c = Math.floor(Math.random()*13 + 1);
      if ($card[$c] < 24) {
         $deck[$i] = $c;
         $card[$c]++;
         $i++;
      }
   }
//   for ($i = 1; $i <= $decks*$suits*$types; $i++) {
//       document.write ("<pre>");
//       document.write ($deck[$i]);
//       document.write ("</pre>");
//   }
//
//   document.close();
   $top_card = 1;
   return 0;
}

function deal_card() {
var $card_dealt;

   if ($top_card/($decks*$suits*$types) >= $shuffle_point) {
      $shuffle_needed = 1;
   }
   $top_card++;
   return ($deck[$top_card-1]);
//   return (1);
}
var $player = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
var $suit = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
var $busted = [0,0,0,0,0,0];
var $dealer = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var $dealer_suit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 

var $dealer_bust;
var $mode;
var $practice;


function deal () {

   $player[1][1] = deal_card();
//  $player[1][1] = 8;
   $suit[1][1] = Math.floor (Math.random() * 4 + 1);
   $suit[1][1] = 3;
   $dealer[1] = deal_card();
//   $dealer[1] = 6;
   $dealer_suit[1] = Math.floor (Math.random() * 4 + 1);
   $player[1][2] = deal_card();
//   $player[1][2] = 8;
   $suit[1][2] = Math.floor (Math.random() * 4 + 1);
   $dealer[2] = deal_card();
//   $dealer[2] = 10;
   $dealer_suit[2] = Math.floor (Math.random() * 4 + 1);
   $dealer[0] = 2;
   $player[1][0] = 2;
   $busted[1] = 0;
   $dealer_bust = 0;

//   $dealer[1] = 1;
//   $dealer_suit[1] = 4;

//   $dealer[2] = 2;
//   $dealer_suit[2] = 4;

//   $dealer[3] = 3;
//   $dealer_suit[3] = 4;

//   $dealer[4] = 4;
//   $dealer_suit[4] = 4;

//   $dealer[5] = 5;
//   $dealer_suit[5] = 4;

//   $dealer[6] = 6;
//   $dealer_suit[6] = 4;

//   $dealer[7] = 7;
//   $dealer_suit[7] = 4;

//   $dealer[8] = 8;
//   $dealer_suit[8] = 4;

//   $dealer[9] = 9;
//   $dealer_suit[9] = 4;

//   $dealer[10] = 10;
//   $dealer_suit[10] = 4;

//   $dealer[11] = 11;
//   $dealer_suit[11] = 4;

//   $dealer[12] = 12;
//   $dealer_suit[12] = 4;

//   $dealer[13] = 13;
//   $dealer_suit[13] = 4;

//   $dealer[0] = 13;

//   $player[1][1] = 1;
//   $suit[1][1] = 1;

//   $player[1][2] = 2;
//   $suit[1][2] = 1;

//   $player[1][3] = 3;
//   $suit[1][3] = 1;

//   $player[1][4] = 4;
//   $suit[1][4] = 1;

//   $player[1][5] = 5;
//   $suit[1][5] = 1;

//   $player[1][6] = 6;
//   $suit[1][6] = 1;

//   $player[1][7] = 7;
//   $suit[1][7] = 1;

//   $player[1][2] = 8;
//   $suit[1][2] = 1;

//   $player[1][1] = 9;
//   $suit[1][1] = 1;

//   $player[1][4] = 10;
//   $suit[1][4] = 1;

//   $player[1][5] = 11;
//   $suit[1][5] = 1;

//   $player[1][6] = 12;
//   $suit[1][6] = 1;

//   $player[1][7] = 13;
//   $suit[1][7] = 1;

//   $player[1][0] = 7;
}

function hit ($hand) {

   $player[$hand][0] = $player[$hand][0] + 1;
   $player[$hand][$player[$hand][0]] = deal_card();
   $suit[$hand][$player[$hand][0]] =
                Math.floor (Math.random() * 4 + 1);
}

var $bet = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
function double_down ($hand) {
var $e;

   $player[$hand][0]++;
   $player[$hand][$player[$hand][0]] = deal_card();
   $suit[$hand][$player[$hand][0]] = Math.floor (Math.random() * 4 + 1); 
   for ($e=1; $e <= $bet_spread; $e++) {
      $bet[$hand][$e] = $bet[$hand][$e]*2;
   }
}

var $total_hands;

var $total = [
                     [0,0,0,0,0],
                     [0,0,0,0,0],
                     [0,0,0,0,0],
                     [0,0,0,0,0],
                     [0,0,0,0,0],
                     [0,0,0,0,0]
                    ];
var $play_hand = [0,0,0,0,0,0];
var $play = [0,0,0,0,0];
var $busted = [0,0,0,0,0];


function eval_player ($hand) {

var $ace_found = [0,0,0,0,0];
var $t;
var $s;
var $i;
var $two_aces = 0;

   for ($t = 1; $t <= $splits_allowed+1; $t++) {
      $ace_found[$t] = 0;
   }
   $total[1][1] = 0;
   $total[1][2] = 0;
   $total[2][1] = 0;
   $total[2][2] = 0;
   $total[3][1] = 0;
   $total[3][2] = 0;
   $total[4][1] = 0;
   $total[4][2] = 0;
  for ($s = 1; $s <= $total_hands; $s++) {
   $busted[$hand] = 0;
   for ($i = 1; $i <= $player[$s][0]; $i++) {
      if (($player[$s][$i] >= 2) &&
          ($player[$s][$i] <= 9)) {
         $total[$s][1] = $total[$s][1] +
            $player[$s][$i];
         $total[$s][2] = $total[$s][2] +
            $player[$s][$i];
      }
      else if (($player[$s][$i] >= 10) &&
          ($player[$s][$i] <= 13)) {
         $total[$s][1] = $total[$s][1] + 10;
         $total[$s][2] = $total[$s][2] + 10;
      }
      else { // ace
         if (!($ace_found[$s])) {
            $total[$s][1] = $total[$s][1]
               + 1;
            $total[$s][2] = $total[$s][2]
               + 11;
            $ace_found[$s] = 1;
         }
         else {
           $total[$s][1] = $total[$s][1]
               + 1;
           $total[$s][2] = $total[$s][2]
               + 1;
         }
      }
   }
   if ($total[$s][2] > 21) {
      $play_hand[$s] = $total[$s][1];
   }
   else {
      $play_hand[$s] = $total[$s][2];
   }
   if (($play_hand[$s] > 21) && ($po[$s] == 1)) {
      $play[$s] = 1; // stop playing on bust
      $busted[$s] = 1;
   }
   else if ($play_hand[$s] > 21) {
      $play[$s] = 1; // stop playing on bust
      $busted[$s] = 1;
      $chand++;
   }
   else if (($play_hand[$s] == 21) &&
          ($player[$s][0] == 2)) {
      $play[$s] = 1; // stop play when blackjack
      $chand++;
   } 
   else if (($player[$s][1] == 1) && ($player[$s][2] != 1) && ($total_hands >=2)) {
      $play[$s] = 1;
      $chand++;
   }
   else if (($player[$s][1] == 1) && ($player[$s][2] == 1)) {
      if (!$two_aces) {
         $two_aces = $s;
      }
   }
  } // for s 
  if ($two_aces) {
     $chand = $two_aces;
  } 
}

var $dealer_total = [0,0,0];
var $dealer_hand;

function eval_dealer ($hand) {

var $ace_found = 0;
var i;

$dealer_total[1] = 0;
$dealer_total[2] = 0;


   for ($i = 1; $i <= $dealer[0]; $i++) {
      if (($dealer[$i] >= 2) && ($dealer[$i] <= 9)) {
         $dealer_total[1] = $dealer_total[1] + $dealer[$i];
         $dealer_total[2] = $dealer_total[2] + $dealer[$i];
      }
      else if (($dealer[$i] >= 10) && ($dealer[$i] <= 13)) {
         $dealer_total[1] = $dealer_total[1] + 10;
         $dealer_total[2] = $dealer_total[2] + 10;
      }
      else { // ace
         if (!$ace_found) {
            $dealer_total[1] = $dealer_total[1] + 1;
            $dealer_total[2] = $dealer_total[2] + 11;
            $ace_found = 1;
         }
         else {
            $dealer_total[1] = $dealer_total[1] + 1;
            $dealer_total[2] = $dealer_total[2] + 1;
         }
      }
   }
   if ($dealer_total[2] > 21) {
      $dealer_hand = $dealer_total[1];
   }
   else {
      $dealer_hand = $dealer_total[2];
   }
   if ($dealer_hand > 21) {
      $dealer_bust = 1;
   }
   else if (($dealer_hand == 21) && ($dealer[0] == 2)) {
      $play[$hand] = 1; // stop play when dealer blackjack
   }
}

var $num_split = 0;

function split ($hand) {

var y;
var f;
var q;

   for ($y = $total_hands; $y >= $chand; $y--) {
      $player[$y+1][1] = $player[$y][1];
      $suit[$y+1][1] = $suit[$y][1];
      $player[$y+1][2] = $player[$y][2];
      $suit[$y+1][2] = $suit[$y][2];
      $player[$y+1][0] = 2;
   }
   $player[$hand][0] = 2;
   $player[$hand+1][0] = 2;
   $player[$hand+1][1] = $player[$hand][2];
   $suit[$hand+1][1] = $suit[$hand][2];

   $player[$hand][2] = deal_card();
   $suit[$hand][2] = Math.floor (Math.random() * 4 + 1);
   $player[$hand+1][2] = deal_card();
   $suit[$hand+1][2] = Math.floor (Math.random() * 4 + 1); 

   $total_hands++;
   $num_split++;
   if ($player[$hand][1] == 1) {
      for ($q = 1; $q <= $total_hands; $q++) {
         if (($player[$q][2] == 1) && ($num_split > $splits_allowed)) {
            $play[$q] = 1;
         }
      }
   }
}

function hit_dealer (){
   $dealer[0]++;
   $dealer[$dealer[0]] = deal_card();
   $dealer_suit[$dealer[0]] = Math.floor (Math.random() * 4 + 1); 
}

var $bet_at = -1;

function bet ($hand) {
var $b;

  for ($b = 1; $b <= $bet_spread; $b++) {
     $bet[$hand][$b] = $unit;
     if ($exact_ace <= $bet_at) {
        $bet[$hand][$b] = $bet[$hand][$b]*$b;
     }
  }
}

var $decision = 0; 
var $play_decision;

var $hard_card;
var $soft_card;

function make_decision ($hand) {

var $split_card;
var $dup;
var $decision_type;
var $play_total;

   $dup = $dealer[1];
   if (($dealer_hand == 21) && ($dealer[0] == 2)) {
      $play[$hand] = 1;
      $decision = 'S';
      $display_decision = 'S';
   }
  else {
   if ($num_split <= $splits_allowed) {
      if ($player[$hand][0] == 2) { //check for splits
         if ($player[$hand][1] == $player[$hand][2]) {
            if ($player[$hand][1] == 1) {
               if (($dealer_total[2] == 21) && ($dealer[0] == 2)) {
                  $play[$hand] = 1;
                  $decision = 'S';
                  $display_decision = 'S';
               }
               else {
                  $decision = 'P';
               }
           }
            else {
               $split_card = $total[$hand][1]/2;
              if ($vary_strategy) {
               $decision = $split_vary[$split_card][$dup];
              }
              else {
               $decision = $split_totals[$split_card][$dup];
              }
               $decision_type = 'P';
           }
        }

        else if ($total[$hand][1] != $total[$hand][2]) {
            $soft_card = $total[$hand][1];
            $play_total = $total[$hand][1];
            if ($player[$hand][0] == 2) {
              if ($vary_strategy) {
               $decision = $soft_vary[$play_total][$dup];
              }
              else {
               $decision = $soft_totals[$play_total][$dup]
              }
            }
            else {
               $decision = $soft_totals2[$total[$hand][1]][$dup];
            }
            $decision_type = 'S';
         }
         else { // hard total
            $hard_card = $total[$hand][1];
            $play_total = $total[$hand][1];
            if ($player[$hand][0] == 2) {
              if ($vary_strategy) {
               $decision = $hard_vary[$play_total][$dup];
              }
              else {
               $decision = $hard_totals[$play_total][$dup];
              }
            }
            else {
              if ($vary_strategy) {
               $decision = $hard_vary2[$hard_card][$dup];
              }
              else {
               $decision = $hard_totals2[$hard_card][$dup];
              }
            }
            $decision_type = 'H';
         }
      }
      // more than 2 cards
      else if ($total[$hand][1] != $total[$hand][2]) {
         if ($total[$hand][2] > 21) { // really a hard
            $hard_card = $total[$hand][1];
            $play_total = $total[$hand][1];
           if ($vary_strategy) {
            $decision = $hard_vary2[$hard_card][$dup];
           }
           else {
            $decision = $hard_totals2[$hard_card][$dup];
           }
            $decision_type = 'H';
         }
         else { // must be a soft total
            $soft_card = $total[$hand][1];
            $play_total = $total[$hand][1];
            $decision = $soft_totals2[$play_total][$dup];
            $decision_type = 'S';
         }
      }
      else {
         $hard_card = $total[$hand][1];
         $play_total = $total[$hand][1];
        if ($vary_strategy) {
         $decision = $hard_vary2[$hard_card][$dup];
        }
        else {
         $decision = $hard_totals2[$hard_card][$dup];
        }
         $decision_type = 'H';
      }
  }

   // soft totals already split
   else if ($total[$hand][1] != $total[$hand][2]) {
      // busted hands, really hard
      if ($total[$hand][2] > 21) { // really a hard
         $hard_card = $total[$hand][1];
         $play_total = $total[$hand][1];
         if ($player[$hand][0] == 2) {
           if ($vary_strategy) {
            $decision = $hard_vary[$play_total][$dup];
           }
           else {
            $decision = $hard_totals[$play_total][$dup];
           }
         }
         else {
           if ($vary_strategy) {
            $decision = $hard_vary2[$hard_card][$dup];
           }
           else {
            $decision = $hard_totals2[$hard_card][$dup];
           }
         }
         $decision_type = 'H';
      }

      else { // must be a soft total
         $soft_card = $total[$hand][1];
         $play_total = $total[$hand][1];
         if ($player[$hand][0] == 2) {
           if ($vary_strategy) {
            $decision = $soft_vary[$play_total][$dup];
           }
           else {
            $decision = $soft_totals[$play_total][$dup];
           }
         }
         else {
            $decision = $soft_totals2[$total[$hand][1]][$dup];
         }
         $decision_type = 'S';
      }
   }
   else { // hard total already split
      $hard_card = $total[$hand][1];
      $play_total = $total[$hand][1];
      if ($player[$hand][0] == 2) {
        if ($vary_strategy) {
         $decision = $hard_vary[$play_total][$dup];
        }
        else {
         $decision = $hard_totals[$play_total][$dup];
        }
      }
      else {
        if ($vary_strategy) {
         $decision = $hard_vary2[$play_total][$dup];
        }
        else {
         $decision = $hard_totals2[$play_total][$dup];
        }
      }
      $decision_type = 'H';
   }
   if (($dealer_total[2] == 21) && $dealer[0] == 2) {
      $play_decision = 'S';
   }
  } // else dealer blackjack
//   $play_decision = $decision
}

var $bankroll = [0,0,0,0,0,0,0,0,0,0,0];
function calc_bank ($amount, $hand) {
var g;

   for ($g = 1; $g <= $bet_spread; $g++) {
      $bankroll[$g] = $bankroll[$g] + $bet[$hand][$g] * $amount
   }
}

var $result = [0,0,0,0,0,0];

function pay_bet ($hand) {

   if ($busted[$hand] == 1) {
      calc_bank (-1, $hand);
      $result[$hand] = "PLAYER BUST";
   }
   else {
      if (!$dealer_bust) {
         if ($dealer_hand > $play_hand[$hand]) {
            if (($dealer_hand == 21) && ($dealer[0] == 2)) {
                $result[$hand] = "DEALER BLACKJACK";
               calc_bank (-1, $hand);
            }
            else {
                $result[$hand] = "DEALER WINS";
               calc_bank (-1, $hand);
            }
         }
         else if ($dealer_hand < $play_hand[$hand]) {
//            document.write ("player0 = " + $player[$hand][0]);
//            document.close();
            if ($play_hand[$hand] == 21) { 
              if  ($player[$hand][0] == 2) {
               if ($total_hands >= 2) {
                   $result[$hand] = "PLAYER WINS";
                  calc_bank (1, $hand);
               }
               else {
                   $result[$hand] = "BLACKJACK";
                  calc_bank (1.5, $hand);
               }
              }
              else {
                 calc_bank (1, $hand);
                 $result[$hand] = "PLAYER WINS";
              }
            }
            else {
               calc_bank (1, $hand);
                $result[$hand] = "PLAYER WINS";
            }
         }
         else {
            if ($dealer_hand == 21) {
               if ($dealer[0] == 2) { //dealer blackjack
                  if ($player[$hand][0] == 2) { //player blackjack
                      $result[$hand] = "PUSH";
                  }
                  else {
                      $result[$hand] = "DEALER BLACKJACK";
                     calc_bank (-1, $hand);
                  }
               }
            else if ($player[$hand][0] == 2) {//player black jack, dealer 21 
                  if ($total_hands >= 2) {
                     $result[$hand] = "PUSH";
                  }
                  else {
                     $result[$hand] = "BLACKJACK";
//                     calc_bank (1.5, $hand);
                  }
               }
               else { //push, three hand 21
                  $result[$hand] = "PUSH";
               }
            }
            else {
               $result[$hand] = "PUSH";
               // otherwise push
            }
         }
      }
      else {
         if ($play_hand[$hand] == 21) {
           if ($player[$hand][0] == 2) {
            if ($total_hands >= 2) {
               $result[$hand] = "DELAER BUST";
               calc_bank (1, $hand);
            }
            else {
               $result[$hand] = "BLACKJACK";
//               calc_bank (1.5, $hand);
            }
           }           
           else {
              $result[$hand] = "DEALER BUST";
              calc_bank (1, $hand);
           }
         }
         else {
            calc_bank (1, $hand);
            $result[$hand] = "DEALER BUST";
         }
      }
   }
}

var $hand_over;
function display_dealer ($just_dealt, $chand) {
var $i;

   eval_dealer(1);
   if ($just_dealt) {
      $dealer_cards = 1;
   }
   else {
      $dealer_cards = $dealer[0];
   }
//   document.write("<html>");
//   document.write("<body>");
//   document.write("<script language=\"javascript\">");
   document.write("<basefont size=5>\n");
   document.write("<b>");
   document.write("Hand  " + $chand);
   document.write("</b>");
   document.write("<form>\n");
   document.write("</form>\n");
   for ($i = 1; $i <= $dealer_cards; $i++) {
         if ($dealer[$i] == 1) {
            if ($dealer_suit[$i] == 1) {
               $str = "<img src=\"" + $cards_dir + $ac.src  + "\">";
               document.write($str);
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $ad.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $as.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $ah.src + "\">");
            }
         }
         else if ($dealer[$i] == 2) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $2c.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $2d.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $2s.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $2h.src + "\">");
            }
         }
         else if ($dealer[$i] == 3) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $3c.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $3d.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $3s.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $3h.src + "\">");
            }
         }
         else if ($dealer[$i] == 4) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $4c.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $4d.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $4s.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $4h.src + "\">");
            }
         }
         else if ($dealer[$i] == 5) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $5c.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $5d.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $5s.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $5h.src + "\">");
            }
         }
         else if ($dealer[$i] == 6) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $6c.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $6d.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $6s.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $6h.src + "\">");
            }
         }
         else if ($dealer[$i] == 7) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $7c.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $7d.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $7s.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $7h.src + "\">");
            }
         }
         else if ($dealer[$i] == 8) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $8c.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $8d.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $8s.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $8h.src + "\">");
            }
         }
         else if ($dealer[$i] == 9) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $9c.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $9d.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $9s.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $9h.src + "\">");
            }
         }
         else if ($dealer[$i] == 10) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $tc.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $td.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $ts.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $th.src + "\">");
            }
         }
         else if ($dealer[$i] == 11) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $jc.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $jd.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $js.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $jh.src + "\">");
            }
         }
         else if ($dealer[$i] == 12) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $qc.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $qd.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $qs.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $qh.src + "\">");
            }
         }
         else if ($dealer[$i] == 13) {
            if ($dealer_suit[$i] == 1) {
               document.write("<img src=\"" + $cards_dir + $kc.src + "\">");
            }
            else if ($dealer_suit[$i] == 2) {
               document.write("<img src=\"" + $cards_dir + $kd.src + "\">");
            }
            else if ($dealer_suit[$i] == 3) {
               document.write("<img src=\"" + $cards_dir + $ks.src + "\">");
            }
            else if ($dealer_suit[$i] == 4) {
               document.write("<img src=\"" + $cards_dir + $kh.src + "\">");
            }
         }
   }
   if ($hand_over == $total_hands) {
      if ($dealer_total[1] != $dealer_total[2]) {
         if ($dealer_total[2] <= 21) {
            document.write("= " + $dealer_total[2]);
         }
         else {
            document.write("= " + $dealer_total[1]);
         }
      }
      else {
         if ($dealer_total[2] > 21) {
            document.write("= " + $dealer_total[1]);
         }
         else {
            document.write("= " + $dealer_total[2]);
         }
      }
   }
}

function display_player ($just_dealt, $hand) {

var $j;
var $k;
  
  document.write("<form>");
  document.write("</form>");
  $j = $hand;
//  for ($j = 1; $j <= 1; $j++) {
   for ($k = 1; $k <= $player[$hand][0]; $k++) {
         if ($player[$j][$k] == 1) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $ac.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $ad.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $as.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $ah.src + "\">");
            }
         }
         else if ($player[$j][$k] == 2) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $2c.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $2d.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $2s.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $2h.src + "\">");
            }
         }
         else if ($player[$j][$k] == 3) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $3c.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $3d.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $3s.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $3h.src + "\">");
            }
         }
         else if ($player[$j][$k] == 4) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $4c.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $4d.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $4s.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $4h.src + "\">");
            }
         }
         else if ($player[$j][$k] == 5) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $5c.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $5d.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $5s.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $5h.src + "\">");
            }
         }
         else if ($player[$j][$k] == 6) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $6c.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $6d.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $6s.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $6h.src + "\">");
            }
         }
         else if ($player[$j][$k] == 7) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $7c.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $7d.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $7s.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $7h.src + "\">");
            }
         }
         else if ($player[$j][$k] == 8) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $8c.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $8d.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $8s.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $8h.src + "\">");
            }
         }
         else if ($player[$j][$k] == 9) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $9c.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $9d.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $9s.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $9h.src + "\">");
            }
         }
         else if ($player[$j][$k] == 10) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $tc.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $td.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $ts.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $th.src + "\">");
            }
         }
         else if ($player[$j][$k] == 11) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $jc.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $jd.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $js.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $jh.src + "\">");
            }
         }
         else if ($player[$j][$k] == 12) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $qc.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $qd.src + "\">");
            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $qs.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $qh.src + "\">");
            }
         }
         else if ($player[$j][$k] == 13) {
            if ($suit[$j][$k] == 1) {
               document.write("<img src=\"" + $cards_dir + $kc.src + "\">");
            }
            else if ($suit[$j][$k] == 2) {
               document.write("<img src=\"" + $cards_dir + $kd.src + "\">");

            }
            else if ($suit[$j][$k] == 3) {
               document.write("<img src=\"" + $cards_dir + $ks.src + "\">");
            }
            else if ($suit[$j][$k] == 4) {
               document.write("<img src=\"" + $cards_dir + $kh.src + "\">");
            }
        }

   }// for k 
      if ($total[$j][1] != $total[$j][2]) {
         if ($total[$j][2] <= 21) {
            document.write("= " + $total[$j][1] + " "
                     + $total[$j][2]);
         }
         else {
            document.write("= " + $total[$j][1]);
         }
      }
      else {
            document.write("= " + $total[$j][1]);
      }

      if ($result[$j]) {
         document.write( " <b>" + $result[$j] + "</b>");
      }

//  } //for j 
  document.write("<\/form>\n");
}

function dealer_complete() {

var $dealer_fini = 0;

   do {
      eval_dealer();
      if ($hit_soft_17) {
         if ($dealer_hand <= 17) {
            hit_dealer();
         }
         else {
            $dealer_fini = 1;
         }
      }
      else {
         if ($dealer_hand <= 16) {
            hit_dealer();
         }
         else {
            $dealer_fini = 1;
         }
      }
   } while (!$dealer_fini);
   eval_dealer();
}

var $po = [0, 0, 0, 0, 0, 0];

function parse_args() {

var $i;
var $j;
var $k;
var $l;
var $position;

  $total_hands = 0;
  $position = $arg.indexOf("=");
  $play_decision = $arg.substring($position+1,$arg.length)
  $arg = $arg.substring(0,$position) 
  $arg = $arg.split("_");
  $j = 1;
  for ($i = 1; $i <= $arg.length-1; $i = $i+2) {
     if ($arg[$i] == "p") {
        break;
     }
     if ($arg[$i] == "po") {
        break;
     }
     else {
        $dealer[$j] = $arg[$i] - 0;
        $dealer_suit[$j] = $arg[$i+1]
        $dealer[0] = $j;
     }
     $j++;
  }
//  for ($i = 1; $i <= $dealer[0]; $i++) {
//     document.write ("dealer " + $i + " " + $dealer[$i]);
//  }
//  document.write ("dealer0 = " + $dealer[0]);
  $j = 0;
  for ($k = $i; $k <= $arg.length-1; $k = $k + 2) {
     if ($arg[$k] == "p") {
        $j++;
        $k++;
        $l = 1;
        $total_hands++;
        $num_split = $total_hands;
     }
     if ($arg[$k] == "po") {
        $j++;
        $k++;
        $l = 1;
        $total_hands++;
        $chand = $total_hands+1;
        for ($i = 1; $i <= $total_hands; $i++) {
           if (!($player[$i][1] == 1) && (!$player[$i][2] ==1)) {
              $play[$i] = 1;
           }
        }
        $dhand = $total_hands+1;
        $po[$total_hands] = 1;
        $num_split = $total_hands;
     }
     if ($arg[$k] != "0") {
        $player[$j][$l] = $arg[$k] - 0;
        $player[$j][0] = $l;
     }
     $suit[$j][$l] = $arg[$k+1];
     $l++;
  }

//  for ($i = 1; $i <= $player[1][0]; $i++) {
//     document.write ("player " + $i + " " + $player[1][$i]);
//  }
//   document.write("player0 = " + $player[1][0]);

}    
    
function display_form () {

var $hit;
var $stand;
var $double;
var $split;
var $i;
var $j;

   document.write("<body>\n");
   document.write("<form>\n");
   document.write("</form>\n");
   document.write("<basefont size=6>\n");
   document.write("<form action=\"index.html\">\n");
   if ($hand_over == $total_hands) {
      document.write("<input type=submit value=\"PLAY AGAIN\">");
   }
   else {
      $hit = "<input type=submit value=\"HIT\" name=\"";
      for ($i = 1; $i <= $dealer[0]; $i++) {
         $hit = $hit + "_" + $dealer[$i] + "_" + $dealer_suit[$i]; 
      }
      if ($play[1] == 0) {
         $hit = $hit + "_p";
      }
      else {
        $hit = $hit + "_po";
      }
     for ($j = 1; $j <= $total_hands; $j++) {
      for ($i = 1; $i <= $player[$j][0]; $i++) {
         $hit= $hit + "_" + $player[$j][$i] + "_" + $suit[$j][$i];
      }
      if ($j <= $total_hands-1) {
         if ($play[$j+1] == 0) {
            $hit = $hit + "_p";
         }
         else {
            $hit = $hit + "_po";
         }
      }
     }
      document.write($hit + "\">");
  
      $stand = "<input type=submit value=\"STAND\" name=\"";
      for ($i = 1; $i <= $dealer[0]; $i++) {
         $stand = $stand + "_" + $dealer[$i] + "_" + $dealer_suit[$i];
      }
      if ($play[1] == 0) {
         $stand = $stand + "_p";
      }
      else {
         $stand = $stand + "_po";
      }
     for ($j = 1; $j <= $total_hands; $j++) {
      for ($i = 1; $i <= $player[$j][0]; $i++) {
         $stand= $stand + "_" + $player[$j][$i] + "_" + $suit[$j][$i];
      }
      if ($j <= $total_hands-1) {
         if ($play[$j+1] == 0) {
            $stand = $stand + "_p";
         }
         else {
            $stand = $stand + "_po";
        }
      }
     }
      document.write($stand + "\">");

      $double = "<input type=submit value=\"DOUBLE\" name=\"";
      for ($i = 1; $i <= $dealer[0]; $i++) {
         $double = $double + "_" + $dealer[$i] + "_" + $dealer_suit[$i];
      }
      if ($play[1] == 0) {
         $double = $double + "_p";
      }
      else {
         $double = $double + "_po";
     }
     for ($j = 1; $j <= $total_hands; $j++) {
      for ($i = 1; $i <= $player[$j][0]; $i++) {
         $double= $double + "_" + $player[$j][$i] + "_" + $suit[$j][$i];
      }
      if ($j <= $total_hands-1) {
         if ($play[$j+1] == 0) {
            $double = $double + "_p";
         }
         else {
            $double = $double + "_po";
        }
      }
     }
      document.write($double + "\">");

     $split = "<input type=submit value=\"SPLIT\" name=\"";
      for ($i = 1; $i <= $dealer[0]; $i++) {
        $split = $split + "_" + $dealer[$i] + "_" + $dealer_suit[$i];
      }
      if ($play[1] == 0) {
         $split = $split + "_p";
      }
      else {
         $split = $split + "_po";
      }
     for ($j = 1; $j <= $total_hands; $j++) {
      for ($i = 1; $i <= $player[1][0]; $i++) {
         $split= $split + "_" + $player[$j][$i] + "_" + $suit[$j][$i];
      }
      if ($j <= $total_hands-1) {
         if ($play[$j+1] == 0) {
             $split = $split + "_p";
         }
         else {
            $split = $split + "_po";
         }
     }
    }
     document.write($split + "\">");
   }
}

function display_table() {

var $q;

   document.write ("<pre>");
   document.write ("<font size=4>");
   document.write ("<b>");
   document.write ("Wrong Decision, Correct Decision = " + $decision + "\n");
   document.write ("Key: H - Hit, S - Stand, D - Double, P - Split");
   document.write ("</b>");
   document.write ("<table border>");
   document.write ("<tr>");
   document.write ("<tr align=\"center\">");
   document.write ("<th colspan=13><font size=4>Dealer's Up Card</th>");
   document.write ("<tr>");
   document.write ("<th><font size=4> 2</th>");
   document.write ("<th><font size=4> 3</th>");
   document.write ("<th><font size=4> 4</th>");
   document.write ("<th><font size=4> 5</th>");
   document.write ("<th><font size=4> 6</th>");
   document.write ("<th><font size=4> 7</th>");
   document.write ("<th><font size=4> 8</th>");
   document.write ("<th><font size=4> 9</th>");
   document.write ("<th><font size=4> T</th>");
   document.write ("<th><font size=4> J</th>");
   document.write ("<th><font size=4> Q</th>");
   document.write ("<th><font size=4> K</th>");
   document.write ("<th><font size=4> A</th>");
   document.write ("<\/tr>");
   if (($player[$dhand][1] == $player[$dhand][2]) && ($player[$dhand][0] == 2) && ($display_decision == "S")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($player[$dhand][1] == $player[$dhand][2]) && ($num_split > $splits_allowed)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($player[$dhand][1] == $player[$dhand][2]) && ($player[$dhand][0] == 2) && ($display_decision == "P")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($player[$dhand][1] == $player[$dhand][2]) && ($player[$dhand][0] == 3) && ($display_decision != "S")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($player[$dhand][1] == $player[$dhand+1][1]) && ($player[$dhand][0] == 2) && ($display_decision == "P")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($player[$dhand][1] == $player[$dhand][2]) && ($player[$dhand][0] >= 4)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals2[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals2[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($player[$dhand][1] == 1) && ($player[$dhand][2] == 1) && ($player[$dhand][0] == 2)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $split_totals[$player[$dhand][1]][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] == $total[$dhand][2]) && ($player[$dhand][0] == 2) && ($display_decision == "S")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] == $total[$dhand][2]) && ($player[$dhand][0] == 2) && ($display_decision == "P")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] == $total[$dhand][2]) && ($player[$dhand][0] >= 3) && ($display_decision == "S")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals2[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals2[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] == $total[$dhand][2]) && ($player[$dhand][0] == 3) && ($display_decision != "S")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] == $total[$dhand][2]) && ($player[$dhand][0] >= 4)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals2[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals2[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] != $total[$dhand][2]) && ($player[$dhand][0] == 2) && ($display_decision == "S")) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $soft_totals[$soft_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $soft_totals[$soft_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] != $total[$dhand][2]) && ($player[$dhand][0] >= 3) && ($display_decision == "S") && ($total[$dhand][2] <= 21)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $soft_totals2[$soft_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $soft_totals2[$soft_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] != $total[$dhand][2]) && ($player[$dhand][0] >= 3) && ($display_decision == "S") && ($total[$dhand][2] > 21)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals2[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals2[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] != $total[$dhand][2]) && ($player[$dhand][0] == 3) && ($display_decision != "S") && ($total[$dhand][2] <= 21)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $soft_totals[$soft_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $soft_totals[$soft_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] != $total[$dhand][2]) && ($player[$dhand][0] == 3) && ($display_decision != "S") && ($total[$dhand][2] > 21)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals2[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals2[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] != $total[$dhand][2])  && ($player[$dhand][0] >= 4) && ($total[$dhand][2] <= 21)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $soft_totals2[$soft_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $soft_totals2[$soft_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   else if (($total[$dhand][1] != $total[$dhand][2])  && ($player[$dhand][0] >= 4) && ($total[$dhand][2] > 21)) {
      document.write ("<tr>");
      for ($q = 2; $q <= 13; $q++) {
         document.write ("<th><font size=4>" + $hard_totals2[$hard_card][$q]
                         + "</th>");
      }
      document.write ("<th><font size=4>" + $hard_totals2[$hard_card][1]
                         + "</th>");
      document.write ("</tr>");
   }
   document.write ("</table>");
   document.write ("</font>");
   document.write ("</pre>");
}

 
var $hands;
var $u;
var $x;
var $h;
var $p;
var $chand = 1;
var $players_bust;
var $input_form;
var $hit;
var $stand;
var $double;
var $split;
var $display_decision;
var $dhand = 1;
var $after_stand = 0;

   shuffle();
   $hands = 1;
   $num_split = 0;
   bet ($players, $total_hands);
   $args = location.search;
   $arg = $args.substring(1);
   if ($arg) {
      parse_args();
   }
   else {
      deal();
      $total_hands = 1;
   }
   if ($chand > $total_hands) {
      $chand = $total_hands;
   }
   $hand_over = 0;
   document.open();
   eval_player($chand);
   if ($chand > $total_hands) {
      $chand = $total_hands;
   }
   eval_dealer();
   make_decision ($chand);
   if ($play_decision == "HIT") {
      hit($chand);
      $display_decision = "H";
   }
   else if ($play_decision == "STAND") {
      $play[$chand] = 1;
      $chand++;
      $display_decision = "S";
      $after_stand = 1;
   }
   else if ($play_decision == "DOUBLE") {
      if ($player[$chand][0] == 2) {
         double_down($chand);
         $play[$chand] = 1;
         $chand++;
         $display_decision = "D";
      }
   }
   else if ($play_decision == "SPLIT") {
      if ($player[$chand][1] == $player[$chand][2]) {
         if ($num_split <= $splits_allowed) {
            split($chand);
         }
      }
         $display_decision = "P";
   }
   if ($play_decision) {
      if ($display_decision != $decision) {
         display_table();
      } 
   }
   if (!$after_stand) {
      eval_player($chand);
   }
   if ($chand > $total_hands) {
      $chand = $total_hands;
   }
   for ($i = 1; $i <= $total_hands; $i++) {
      $hand_over = $hand_over + $play[$i];
   }
   if ($hand_over == $total_hands) {
      dealer_complete();
   }
   if ($hand_over == $total_hands) {
      for ($i = 1; $i <= $total_hands; $i++) {
         pay_bet($i);
      }
      display_dealer(0,$chand);
   }
   else {
      display_dealer(1,$chand);
   }
   for ($x = 1; $x <= $total_hands; $x++) {
      display_player(1, $x);
      document.write("<form>");
      document.write("</form>");
   }
   display_form();

} // end main
main();