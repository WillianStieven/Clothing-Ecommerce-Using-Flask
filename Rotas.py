from flask import request, Flask, render_template, redirect, url_for, flash, jsonify, request, send_from_directory
from distutils.log import debug
from flask_mail import Mail,Message
from random import SystemRandom as sr
import string as s
import sqlite3
import secrets
import shutil
import json
import ssl
import os

app = Flask(__name__)
app.secret_key = 'asrtarstaursdlarsn'
app.config["MAIL_SERVER"] = 'smtp.gmail.com'
app.config["MAIL_PORT"] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False
app.config["MAIL_USERNAME"] = 'womanstoreof@gmail.com'   
app.config['MAIL_PASSWORD'] = 'zaogmhixhokdxzau' 
mail = Mail(app)

@app.route('/')
def start():
    return render_template('index.html')

# ---------- viewer do produto e buscas
@app.route('/<view>')
def viewer(view):
    banco = sqlite3.connect('banco_cadastro.db')   
    cursor = banco.cursor()
    
    cursor.execute("SELECT id FROM PRODUTOS WHERE id='{}'".format(view))
    ext = cursor.fetchall()
    print(ext)

    if not ext:
        return render_template('search_product.html', view=view)

    else:
        cursor.execute("SELECT id, title, price, desc, img1, img2 FROM PRODUTOS WHERE id='{}'".format(view))
        nulo = cursor.fetchall()
        if view == nulo[0][0]:
            id = nulo[0][0] 
            title = nulo[0][1]
            price = nulo[0][2]
            credi_mod = float(price.replace("R$",'')) / 3
            credi = "%.2f" % credi_mod
            desc = nulo[0][3]
            img1 = "static/imgs_for_product/#.png".replace("#", nulo[0][4])
            img2 = "static/imgs_for_product/#.png".replace("#", nulo[0][5])
            print(img1)

            return render_template('view.html', id=id, title=title, price=price, desc=desc, img1=img1, credi=credi) 


# ----------- logar e cadastrar 
@app.route("/login")
def login():
    return render_template('login.html')

@app.route("/logout", methods=["POST","GET"])
def logout():
    e_lower = request.form["checaremail"]
    email = e_lower.lower()
    senha = request.form["checarsenha"]
    banco = sqlite3.connect('banco_cadastro.db') 
    cursor = banco.cursor()

    # ***** Indentificação ********
    cursor.execute("SELECT senha FROM DATABASE WHERE email='{}'".format(email))
    senhadb = cursor.fetchall()

    cursor.execute("SELECT email FROM DATABASE WHERE email='{}'".format(email))
    emaildb = cursor.fetchall()

    if not emaildb:
        flash("Usuário não cadastrado")
        return render_template("login.html")

    elif senha == senhadb[0][0]:

        cursor.execute("SELECT angel FROM DATABASE WHERE email='{}'".format(email))
        n = cursor.fetchall()
        angel = n[0][0]

        return render_template('index.html', angel=angel)
    
    else:
        flash("Email ou senha incorretos")
        return render_template("login.html")

@app.route("/checking")
def cadastrar():
    return render_template("checking.html")

@app.route("/checking", methods=["POST","GET"])
def checking():
    global email, angel, senha, num, token
    token = secrets.token_hex(10)
    num = secrets.randbits(20) 
    e_lower = request.form["email"]
    email = e_lower.lower()
    senha = request.form["senha"]

    banco = sqlite3.connect('banco_cadastro.db') 
    cursor = banco.cursor()

    cursor.execute("SELECT COUNT(*) FROM DATABASE")
    count = cursor.fetchall()
    angel = "Angel#%s" %count[0][0]

    if "@gmail.com" not in email and "@hotmail.com" not in email:
        flash("Email inválido")

    try:
        cursor.execute("SELECT email FROM DATABASE WHERE email='{}'".format(email))
        nomedb = cursor.fetchall()
        if nomedb == []:
            msg = Message(subject="Registro de email", sender="asamayimoficial@gmail.com", recipients=[email])
            msg.html = "O seu codigo é: <b>%s</b>" %num
            mail.send(msg)
            return render_template('checkout.html')
        else:
            flash("Usuário já cadastrado")
            return render_template("login.html")     

    except sqlite3.Error as erro:
        print("Erro ao inserir os dados: ", erro)


@app.route("/checkout", methods=["POST","GET"])
def checkout():
    banco = sqlite3.connect('banco_cadastro.db') 
    cursor = banco.cursor()
    code = request.form["codigo"] 
    print(num)
    try:
        if str(code) == str(num):
            cursor.execute("CREATE TABLE IF NOT EXISTS DATABASE (email text, senha text, angel text, token text)")
            cursor.execute("INSERT INTO DATABASE VALUES ('"+email+"', '"+senha+"', '"+angel+"', '"+token+"')")
            banco.commit() 
            banco.close()
            return render_template('checkout.html', angel=angel)
        else:
            flash("código inválido")
            return render_template('checkout.html')        
    except sqlite3.Error as erro:
        flash("Código expirado")

    return render_template("checkout.html")
# ---------- Recuperar senha

@app.route("/recuperarsenha")
def index_email():
    return render_template('email.html')

# ******* ENTRADA DE ALTERAÇÃO DE SENHA
@app.route("/recuperarsenha", methods=["POST","GET"])
def email():
    global email
    e_email = request.form["email"] 
    email = e_email.lower()
    senha = request.form["senha"]
    c_senha = request.form["confirmarsenha"]
    token = secrets.randbits(20) 

    banco = sqlite3.connect('banco_cadastro.db') 
    cursor = banco.cursor()

    cursor.execute("SELECT email FROM DATABASE WHERE email='{}'".format(email))
    emaildb = cursor.fetchall()

    if senha == c_senha:
        if not emaildb:
            flash("Esse email não está cadastrado")
            return render_template("email.html")
        else:
            msg = Message(subject="Recuperação de senha", sender="asamayimoficial@gmail.com", recipients=[email])
            msg.html = "O seu codigo de recuperação é:<b>%s</b>" %token
            mail.send(msg)
                 
            cursor.execute("UPDATE DATABASE SET token = %s WHERE email='%s'" % (token, email))
            banco.commit()
            banco.close()
            return render_template("alterarsenha.html")
    else:
        flash("As senhas digitadas são diferentes")
        return render_template("email.html")


# ******* SAIDA E CONFIRMAÇÃO DE ALTERAÇÃO DE SENHA
@app.route("/alterarsenha" , methods=["POST","GET"])
def alterar():
    banco = sqlite3.connect('banco_cadastro.db') 
    cursor = banco.cursor()
    code = request.form["codigo"]

    cursor.execute("SELECT token FROM DATABASE WHERE email='{}'".format(email))
    token_alt = cursor.fetchall()

    try:
        if code == token_alt[0][0]:     
            return render_template("login.html")

        else:
            flash("código inválido")
            return render_template("alterarsenha.html")

    except sqlite3.Error as erro:
        flash("Código expirado")
        return render_template("alterarsenha.html")

# --------- perfil e carrinho
@app.route('/myperfil')
def perfil():
    return render_template('profile.html')

@app.route('/cart',  methods=['GET', 'POST'])
def cart():
    if request.method == 'POST':
        print((request.json))

    return render_template('cart.html')

#  ------------- Pagamento
@app.route("/identify")
def identify():
    return render_template('identify.html')

@app.route("/order", methods=['GET', 'POST'])
def order():
    if request.method == 'POST':
        banco = sqlite3.connect('banco_cadastro.db') 
        cursor = banco.cursor()
        data = json.loads(request.data)
        print(data)
        uf = data[0]['UF']
        cidade = data[0]['CIDADE']
        bairro = data[0]['BAIRRO']
        rua = data[0]['ADRESS']
        fone = data[0]['FONE']
        sub= data[0]['TOTAL']
        total = str(sub)

        cursor.execute("CREATE TABLE IF NOT EXISTS PAYED (cep text, uf text, cidade text, bairro text, rua text, fone text, total text)")
        cursor.execute("INSERT INTO PAYED VALUES ('"+cep+"', '"+uf+"', '"+cidade+"','"+bairro+"', '"+rua+"' ,'"+fone+"', '"+total+"')")
        banco.commit() 
        # banco.close()
        return ('', 204)


@app.route('/pay', methods=["POST","GET"])
def pay():
    return render_template('pay.html')
     

if __name__ == "__main__":
    app.run(debug=True, port=8000)      












































# @app.route("/endereco", methods=["POST","GET"])
# def adress():
#     cep = request.form["cep"] 
#     bairro = request.form["bairro"]
#     cidade = request.form["cidade"]
#     print(cep, bairro, cidade)

#     return render_template('identify.html')

# @app.route("/pix", methods=["POST"])
# def imprimirPix():
#     imprime = print(request.json)
#     data = request.json
#     with open('data.txt', 'a') as outfile:
#         outfile.write("\n")
#         json.dump(data, outfile)
#     return jsonify(imprime)

# def viewer(view):
#     try:
#         banco = sqlite3.connect('banco_cadastro.db') 
#         cursor = banco.cursor()

#         cursor.execute("SELECT id, title, price, desc, img1, img2 FROM PRODUTOS WHERE id='{}'".format(view))
#         nulo = cursor.fetchall()
#         if view == nulo[0][0]:
#             id = nulo[0][0] 
#             title = nulo[0][1]
#             price = nulo[0][2]
#             desc = nulo[0][3]
#             img1 = "static/imgs_for_product/#.png".replace("#", nulo[0][4])
#             img2 = "static/imgs_for_product/#.png".replace("#", nulo[0][5])
#             print(img1)
    
#             return render_template('view.html', id=id, title=title, price=price, desc=desc, img1=img1) 
  
#     except:
#         return render_template('search_product.html')

    # ----- Endereço
    # cursor.execute("SELECT nome, rua, bairro, cidade, cep, telefone, numero FROM ENDERECOS WHERE email='{}'".format(nome))
    # dados = cursor.fetchall()
    # name = dados[0][0]
    # rua = dados[0][1]
    # bairro = dados[0][2]
    # cidade = dados[0][3]
    # cep = dados[0][4]
    # telefone = dados[0][5]
    # numero = dados[0][6]

    # token_pay = "".join(sr().choices(s.ascii_letters, k=32))
    # rua = request.form["rua"]
    # numero = request.form["numero"]
    # bairro = request.form["bairro"]
    # cidade = request.form["cidade"]
    # telefone = request.form["telefone"]
    # cep = request.form["cep"]
    # cep_2 = request.form["cep2"]
    # cep = cep_1 + cep_2
    # cursor.execute("CREATE TABLE IF NOT EXISTS ENDERECOS (email text, nome text, rua text, numero text, bairro text, cidade text, telefone text, cep text)")
    # cursor.execute("INSERT INTO ENDERECOS VALUES ('"+nome+"','"+token+"','"+rua+"','"+numero+"','"+bairro+"','"+cidade+"','"+telefone+"','"+cep+"')")

# @app.route("/editadress", methods=["POST","GET"])
# def mod_adress():
#     name = request.form["nome"]
#     rua = request.form["rua"]
#     numero = request.form["numero"]
#     bairro = request.form["bairro"]
#     cidade = request.form["cidade"]
#     telefone = request.form["telefone"]
#     cep = request.form["cep"]
#     return render_template('logout.html', name=name, bairro=bairro, rua=rua, cidade=cidade, cep=cep, numero=numero, telefone=telefone)


# <div class="box_pedidos_two">
# 					<div class="titles">
# 						<h2>Endereço:</h2>
# 					</div>
# 					<form id="mod_adress" action="editadress" method="POST">
# 						<div class="box_e">
# 							<label>Rua: </label><input name="rua" class="block">
# 							<label>Número: </label><input name="numero" class="block">
# 							<label>Bairro: </label><input  name="bairro" class="block">
# 						</div>
# 						<div class="box_e">
# 							<label>Cidade: </label><input name="cidade" class="block">
# 							<label>Telefone: </label><input name="telefone" class="block">
# 							<label>Cep: </label><input  name="cep" class="block" >
# 						</div>
# 						<div class="box_e">	
# 							<label>Nome: </label><input name="nome" class="block">			
# 							<label id="label_block" onclick="desblock()">Editar</label>
# 							<button id="bt_block" class="button-p">Confirmar</button>
# 						</div>
# 					</form>
# 				</div>
    