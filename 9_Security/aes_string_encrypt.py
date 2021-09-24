from Crypto.Cipher import AES
import hashlib

key = b'Sixteen byte key'
data = b"This is a secret message to Caelum: Hi"

print("Secret message to be sent is:", data)

#MD5 Hash the message to guarantee integrity
md5_hash = hashlib.md5(data)

#Encrypt the message with AES
cipher = AES.new(key, AES.MODE_EAX)
nonce = cipher.nonce
ciphertext, tag = cipher.encrypt_and_digest(data)

print("MD5 hash of the message is:", md5_hash.hexdigest())
print("Encrypted message is ", ciphertext, "and tag is", tag)


second_key = b"Sixteen byte kay"
#Decrypt the message
cipherDecryption = AES.new(second_key, AES.MODE_EAX, nonce=nonce)
plaintext = cipherDecryption.decrypt(ciphertext)

#MD5 Hash the received message to check for integrity
received_md5_hash = hashlib.md5(plaintext)

print("MD5 hash of the received message is:", received_md5_hash.hexdigest())
print("Decrypted message is" , plaintext)

if received_md5_hash.hexdigest() == md5_hash.hexdigest():
    print("The message integrity is intact - it has not been tampered with!")
else:
    print("WARNING: The message integrity is not intact - it has been tampered with")
