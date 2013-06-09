<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ryang2616
 * Date: 5/20/13
 * Time: 10:08 AM
 * To change this template use File | Settings | File Templates.
 /**/

//print_r( $_GET );
//
//$qty = ( $_GET[qty] );
//$pid = ( $_GET[pid] );
//
//print_r( $qty );
//print_r( $$pid );


// TIME TO PROCESS THE INFO

$form = <<<END_OF_FORM
<form method=post action="purchase.php?">
Name: <input type="text" name="name" /><br/>
Address: <input type="text" name="address" /><br/>
<input type="submit" name="submit" value="Submit Order" />
END_OF_FORM;

//gotta make a purchase.php page

