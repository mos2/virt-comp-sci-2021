from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

key = b"iamsosmarthomers"
cipher = AES.new(key, AES.MODE_EAX)
ciphertext, tag = cipher.encrypt_and_digest(b'Subscribe to Byte Travel')

file_out = open("encrypted.bin", "wb")
for x in (cipher.nonce, tag, ciphertext):
    file_out.write(x)

file_out.close()