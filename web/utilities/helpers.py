from web.utilities import config

def payload_is_valid(payload, expected_arguments) -> bool:
    for arg in expected_arguments:
        if arg not in payload:
            return False
    return True

def is_valid_secret_in_request(request):
    secret_key = request.headers.get('X-Secret-Key')
    return secret_key == config.POST_SCERET