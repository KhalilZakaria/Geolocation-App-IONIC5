<?php
//header('Access-Control-Allow-Origin: localhost');
//header('Access-Control-Allow-Origin: localhost:8080');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=utf_8');
header('Content-Type: text/html; charset=UTF-8');
//header('Access-Control-Allow-Origin: https://infinityfree.net');
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Origin: http://localhost');

//include "config.php"; 
define('DB_NAME','allonzy');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_HOST','localhost');

$mysqli =  new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$postjson = json_decode(file_get_contents('php://input'), true);
//echo($postjson[full_name])
$today = date('Y-m-d');

if($postjson['aksi'] == "add_reg") {
    $password = md5($postjson['password']);
    $query = mysqli_query($mysqli, "INSERT INTO login SET 
    full_name       = '$postjson[full_name]',
    phone_number    = '$postjson[phone_number]',
    username        = '$postjson[username]',
    e_mail          = '$postjson[e_mail]',
    password        = '$password' 
  ");

  if($query) $result = json_encode(array('success' =>true));
  else $result = json_encode(array('success' => false, 'msg'=>'error , please try again'));
  echo $result;

}
if($postjson['aksi'] == "add_register") {
    $password = md5($postjson['password']);
    $query = mysqli_query($mysqli, "SELECT * FROM login WHERE e_mail='$postjson[e_mail]'");
    $check = mysqli_num_rows($query);
    if($check>0){
     $result = json_encode(array('success' => false, 'msg'=>'le mail est déja enregistré '));}
     else {
     $password = md5($postjson['password']);
    $query = mysqli_query($mysqli, "INSERT INTO login SET 
    full_name       = '$postjson[full_name]',
    phone_number    = '$postjson[phone_number]',
    username        = '$postjson[username]',
    e_mail          = '$postjson[e_mail]',
    password        = '$password' 
  ");

  if($query) $result = json_encode(array('success' =>true));
  else $result = json_encode(array('success' => false, 'msg'=>'error , please try again','result'=>$mysqli));
  
}
       echo $result;
}
elseif($postjson['aksi'] == "login") {
  $password = md5($postjson['password']);
  $query = mysqli_query($mysqli, "SELECT * FROM login WHERE e_mail='$postjson[e_mail]' AND password='$password' 
");
$check = mysqli_num_rows($query);

if($check>0){
  $data = mysqli_fetch_array($query);
  $datauser = array(
    'user_id' => $data['user_id'],
    'full_name' => $data['full_name'],
    'phone_number' => $data['phone_number'],
    'username' => $data['username'],
    'e_mail' => $data['e_mail'],
    'password' => $data['password']
  );

if($query) $result = json_encode(array('success' =>true, 'result'=>$datauser));
else $result = json_encode(array('success' => false, 'msg'=>'error, please try again'));

}else{
  $result = json_encode(array('success' => false, 'msg'=>'unregister account'));
}

echo $result;
}

if($postjson['aksi']=='add'){

    $query = mysqli_query($mysqli, "INSERT INTO master_customer SET
    name_customer = '$postjson[name_customer]',
    desc_customer = '$postjson[desc_customer]',
    created_at    = '$today'
");

   $idcust = mysqli_insert_id($mysqli);

   if($query) $result = json_encode(array('success'=>true, 'customerid'=>$idcust));
   else $result = json_encode(array('success'=>false));

   echo $result;
}

elseif($postjson['aksi']=='getdata'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT * FROM master_customer ORDER BY customer_id DESC LIMIT $postjson[start],$postjson[limit]");

    while($row = mysqli_fetch_array($query)){

        $data[] = array(
            'customer_id'   => $row['customer_id'],
            'name_customer' => $row['name_customer'],
            'desc_customer' => $row['desc_customer'],
            'created_at'    => $row['created_at'],
        );
    }

    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false));
    
    echo $result;
}

elseif($postjson['aksi']=='update'){
    $query = mysqli_query($mysqli, "UPDATE master_customer SET 
        name_customer='$postjson[name_customer]',
        desc_customer='$postjson[desc_customer]' WHERE customer_id='$postjson[customer_id]'
        ");

    if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
    else $result = json_encode(array('success'=>false, 'result'=>'error'));
    
    echo $result;
}

elseif($postjson['aksi']=='delete'){
    $query = mysqli_query($mysqli, "DELETE FROM master_customer WHERE customer_id='$postjson[customer_id]'
        ");

    if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
    else $result = json_encode(array('success'=>false, 'result'=>'error'));
    
    echo $result;
}
if($postjson['aksi']=='addPosition'){
  //the solution for utf-8
    mysqli_query($mysqli,"SET NAMES 'utf8'");
    $query = mysqli_query($mysqli, "INSERT INTO master_position SET 

    pos_region      = '$postjson[pos_region]',
    pos_ville       = '$postjson[pos_ville]',
    pos_POI         = '$postjson[pos_POI]',
    latitude        = '$postjson[latitude]',
    longitude        = '$postjson[longitude]',
    e_mail         = '$postjson[e_mail]'
  ");
    $id_position = mysqli_insert_id($mysqli);
    //'id_position'=>$id_position
    if($query) $result = json_encode(array('success'=>true,'id_position'=>$id_position ,'msg'=>'votre position !'));
    else $result = json_encode(array('success'=>false,'msg'=>'non ajouté'));
    echo $query;
    echo $result;
}

?>
    
    
    
    
    