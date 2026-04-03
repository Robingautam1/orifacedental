import glob
for f in glob.glob('*.html') + glob.glob('services/*.html'):
    with open(f, 'r') as file:
        content = file.read()
    
    content = content.replace('Honest dental care in Rohtak for 12+ years.', 'Honest, precise dental care in Rohtak.')
    content = content.replace('Honest dental care in Rohtak.', 'Honest, precise dental care in Rohtak.')
    
    with open(f, 'w') as file:
        file.write(content)
