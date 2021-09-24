import pyDes

message = b"Subscribe to Byte Travel"
key = b"MICHAELJ"
crypto = pyDes.des(key, pyDes.CBC, b"\0\0\0\0\0\0\0\0", pad=None, padmode=pyDes.PAD_PKCS5)
encrypted_message = crypto.encrypt(message)
print("Encrypted: %r" % encrypted_message)

key_two = "MICHAELJ"
crypto_two = pyDes.des(key_two, pyDes.CBC, b"\0\0\0\0\0\0\0\0", pad=None, padmode=pyDes.PAD_PKCS5)

decrypted_message = crypto_two.decrypt(encrypted_message)
assert crypto_two.decrypt(encrypted_message) == message

print("Decrypted: %r" % decrypted_message)
